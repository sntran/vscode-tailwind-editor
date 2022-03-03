import {
  CustomTextEditorProvider,
  ExtensionContext,
  Disposable,
  CancellationToken,

  WebviewPanel,
  Webview,

  Uri,

  TextDocument,
  WorkspaceEdit,
  Range,

  window,
  workspace,
} from 'vscode';

import {
  getNonce,
  parseHtml,
  select1,
} from './util';

/**
 * Provider for Tailwind Editor.
 *
 * Tailwind Editors are used for `.html` files, which use Tailwind CSS.
 * To get started, run this extension and open an empty `.html` file in VS Code.
 *
 * This provider demonstrates:
 *
 * - Setting up the initial webview for a custom editor.
 * - Loading scripts and styles in a custom editor.
 * - Synchronizing changes between a text document and a custom editor.
 */
export class TailwindEditorProvider implements CustomTextEditorProvider {

  public static register(context: ExtensionContext): Disposable {
    const provider = new TailwindEditorProvider(context);
    const providerRegistration = window.registerCustomEditorProvider(TailwindEditorProvider.viewType, provider, {
      webviewOptions: {
        enableFindWidget: true,
        retainContextWhenHidden: true,
      }
    });
    return providerRegistration;
  }

  private static readonly viewType = 'tailwind.editor';

  constructor(
    private readonly context: ExtensionContext
  ) { }

  /**
   * Called when our custom editor is opened.
   *
   *
   */
   public async resolveCustomTextEditor(
    document: TextDocument,
    webviewPanel: WebviewPanel,
    _token: CancellationToken
  ): Promise<void> {
    const webview = webviewPanel.webview;

    // Setup initial content for the webview
    webview.options = {
      enableScripts: true,
    };
    webview.html = this.getHtmlForWebview(webview, document);

    function updateWebview() {
      webview.postMessage({
        type: 'update',
        text: document.getText(),
      });
    }

    // Hook up event handlers so that we can synchronize the webview with the text document.
    //
    // The text document acts as our model, so we have to sync change in the document to our
    // editor and sync changes in the editor back to the document.
    //
    // Remember that a single text document can also be shared between multiple custom
    // editors (this happens for example when you split a custom editor)
    const changeDocumentSubscription = workspace.onDidChangeTextDocument(e => {
      if (e.document.uri.toString() === document.uri.toString()) {
        updateWebview();
      }
    });

    // Make sure we get rid of the listener when our editor is closed.
    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
    });

    // Receive message from the webview.
    webview.onDidReceiveMessage(({type, payload}) => {
      switch (type) {
        case 'mutations':
          this.applyMutations(document, payload);
          break;
      }
    });

    updateWebview();

  }

  /**
   * Get the static html used for the editor webviews.
   */
  private getHtmlForWebview(webview: Webview, document: TextDocument): string {
    const rootPath = workspace.workspaceFolders?.[0]?.uri || Uri.file("/");

    const baseUri = webview.asWebviewUri(rootPath);

    // Local path to script and css for the webview
    const scriptUri = webview.asWebviewUri(Uri.joinPath(
      this.context.extensionUri, 'media', 'editor.js'));

    const configUri = webview.asWebviewUri(Uri.joinPath(
      rootPath, 'examples', 'tailwind.config.js'));

    const html = document.getText();
    let content = html;
    // If the HTML is full document, we only want the content inside <body>
    if (html.indexOf('<body') > -1) {
      content = html.substring(
        html.indexOf('<body'),
        html.indexOf('</body>')
      );
      // Substring after the first closing tag on the `<body>`
      content = content.substring(content.indexOf(">") + 1);
    }

    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce();

    return /* html */`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />

        <!-- Use the base Uri of the webview from workspace's root path. -->
        <base href="${baseUri}" />

        <!--
        Use a content security policy to only allow loading images from https or from our extension directory,
        and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource}; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <script nonce="${nonce}" src="https://cdn.tailwindcss.com"></script>
        <script nonce="${nonce}" src="${configUri}"></script>
        <style type="text/tailwindcss">
          @layer utilities {
            .content-auto {
              content-visibility: auto;
            }
          }
        </style>

        <title>Tailwind Editor</title>

        <template id="tailwind-editor-template">
          <slot></slot>

          <script nonce="${nonce}" crossorigin src="https://unpkg.com/get-xpath"></script>
        </template>
      </head>

      <body is="tailwind-editor">
        ${content}

        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>`;
  }

  /**
   * Applies a list of mutations to a text document.
   */
  private applyMutations(document: TextDocument, mutations: any[]):void {
    const doc = parseHtml(document.getText());
    mutations.forEach(mutation => {
      const {
        type,
        attributeName,
        oldValue,
        newValue,
        xpath,
      } = mutation;

      const target = select1(xpath.replace("/html/body/", "//"), doc);
      target.setAttribute(attributeName, newValue);
    });

    const edit = new WorkspaceEdit();
    // Just replace the entire document every time for now.
    // A more complete extension should compute minimal edits instead.
    edit.replace(
      document.uri,
      new Range(0, 0, document.lineCount, 0),
      doc.toString()
    );
    workspace.applyEdit(edit);
  }
}
