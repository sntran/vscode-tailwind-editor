// @ts-check

// Get a reference to the VS Code webview api.
// We use this API to post messages back to our extension.

// @ts-ignore
const vscode = acquireVsCodeApi();

/**
 * Tailwind Editor as a Web Component.
 */
class TailwindEditor extends HTMLBodyElement {
  constructor() {
    // Always call super first in constructor
    super();

    const template = /** @type {HTMLTemplateElement} */ (document.getElementById('tailwind-editor-template'));
    // Create a shadow root
    const shadowRoot = this.attachShadow({
      // Keeps the shadow root open so we can query elements
      // inside it for event binding.
      mode: "open",
    }); // sets and returns `this.shadowRoot`
    shadowRoot.appendChild(template.content);
    template.remove();

    // Remove the current script tag so it does not show up in the light DOM.
    document.currentScript.remove();
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
          oldValue,
        } = mutation;

        const newValue = /** @type {Element} */(target).getAttribute(attributeName);

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
        type: 'mutations',
        payload,
      });
    });

    observer.observe(this, {
      subtree: true,
      childList: false,
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true,
      characterData: false,
      characterDataOldValue: false,
    });
  }
}

window.customElements.define("tailwind-editor", TailwindEditor, {
  extends: "body",
});

/**
 * Render the document in the webview.
 */
function updateContent(/** @type {string} */ content) {
  document.body.innerHTML = content;
}

window.addEventListener('message', event => {
  const message = event.data; // The json data that the extension sent
  switch (message.type) {
    case 'update':
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
