// @ts-check

// Get a reference to the VS Code webview api.
// We use this API to post messages back to our extension.

// @ts-ignore
const vscode = acquireVsCodeApi();

/**
 * Tailwind Editor as a Web Component.
 */
customElements.define("tailwind-editor", class extends HTMLBodyElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadowRoot = this.attachShadow({
      // Keeps the shadow root open so we can query elements
      // inside it for event binding.
      mode: "open",
    }); // sets and returns `this.shadowRoot`
    shadowRoot.innerHTML = `
      <style></style>
      <slot></slot>
    `;
  }

  connectedCallback() {
    const observer = new MutationObserver(mutations => {
      const payload = [];

      // Serializes the mutations.
      mutations.forEach(mutation => {
        const {
          type,
          target,
          attributeName,
          oldValue = "",
        } = mutation;

        const newValue = /** @type {Element} */(target).getAttribute(attributeName) || "";

        if (newValue === oldValue) return;

        payload.push({
          type,
          attributeName,
          oldValue,
          newValue,
          // @ts-ignore
          xpath: getXPath(target),
        });
      });

      // Sends serialized payload to backend.
      vscode.postMessage({
        type: "mutations",
        payload,
      });
    });

    observer.observe(this, {
      subtree: true,
      childList: false,
      attributes: true,
      attributeFilter: ["class"],
      attributeOldValue: true,
      characterData: false,
      characterDataOldValue: false,
    });
  }
}, {
  extends: "body",
});

// A custom element that acts like the new `<portal>` element.
// Content in its light DOM are kept as is, but wrapped with an `<a>` inside
// the shadow DOM. Scoped styles also prevent user interaction to content.
function constructPortal() {
  // Create a shadow root
  const shadowRoot = this.attachShadow({
    // Keeps the shadow root open so we can query elements
    // inside it for event binding.
    mode: "open",
  }); // sets and returns `this.shadowRoot`

  const style = document.createElement("style");
  const link = document.createElement("a");
  const slot = document.createElement("slot");

  style.innerHTML = `
    :host {
      display: block;
    }
    :host(:hover) {
      outline: 1px dotted;
    }
    :host > a {
      display: block;
      cursor: pointer;
      text-decoration: none;
    }
    ::slotted(*) {
      pointer-events: none;
      user-select: none;
    }
  `;

  link.setAttribute("href", this.getAttribute("src"));
  this.removeAttribute("src");

  shadowRoot.appendChild(style);
  shadowRoot.appendChild(link);
  link.appendChild(slot);

  this.removeAttribute("is");
}

/** A mapping of tagName to JS class that extends HTMElement. */
/** Only [elements that can have shadow root](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#elements_you_can_attach_a_shadow_to) */
const elements = {
  "article": HTMLElement,
  "aside": HTMLElement,
  "blockquote": HTMLElement,
  "body": HTMLBodyElement,
  "div": HTMLDivElement,
  "footer": HTMLElement,
  "h1": HTMLHeadingElement,
  "h2": HTMLHeadingElement,
  "h3": HTMLHeadingElement,
  "h4": HTMLHeadingElement,
  "h5": HTMLHeadingElement,
  "h6": HTMLHeadingElement,
  "header": HTMLElement,
  "main": HTMLElement,
  "nav": HTMLElement,
  "p": HTMLParagraphElement,
  "section": HTMLElement,
  "span": HTMLSpanElement,
};

/** Queries custom portals on the page so we can create custom element for them. */
const portals = document.evaluate(
  "//*[starts-with(@is,'portal-')]",
  document.body,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);

for (let i=0, l=portals.snapshotLength; i<l; i++) {
  const portal = /** @type {HTMLElement} **/(portals.snapshotItem(i));
  const [, tagName] = (portal.getAttribute("is") || "").split("-");
  /** @type { CustomElementConstructor } */
  const HTMLElement = elements[tagName];

  if (!HTMLElement) {
    portal.removeAttribute("is");
    portal.removeAttribute("src");
    continue;
  };

  /** @type { CustomElementConstructor } */
  const constructor = class extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
      constructPortal.call(this);
    }
  };

  customElements.define(`portal-${ tagName }`, constructor, {
    extends: tagName,
  });
}

/**
 * Render the document in the webview.
 */
function updateContent(/** @type {string} */ content) {
  const newDocument = new DOMParser().parseFromString(content, "text/html");

  // @ts-ignore
  // Morphs the DOM with the new changes only.
  nanomorph(document.body, newDocument.body, {
    childrenOnly: true,
  });
}

window.addEventListener("message", event => {
  const message = event.data; // The json data that the extension sent
  switch (message.type) {
    case "update":
      const content = message.content;

      // Update our webview's content
      updateContent(content);

      // Then persist state information.
      // This state is returned in the call to `vscode.getState` below when a webview is reloaded.
      vscode.setState({ content });

      return;
  }
});

// Webviews are normally torn down when not visible and re-created when they become visible again.
// State lets us save information across these re-loads
const state = vscode.getState();
if (state) {
  updateContent(state.content);
}
