import * as vscode from 'vscode';

import { getNonce } from './util';

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
export class TailwindEditorProvider implements vscode.CustomTextEditorProvider {
  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new TailwindEditorProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(TailwindEditorProvider.viewType, provider);
    return providerRegistration;
  }

  private static readonly viewType = 'tailwind.editor';

  constructor(
    private readonly context: vscode.ExtensionContext
  ) { }

  /**
   * Called when our custom editor is opened.
   *
   *
   */
   public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
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
    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
      if (e.document.uri.toString() === document.uri.toString()) {
        updateWebview();
      }
    });

    // Make sure we get rid of the listener when our editor is closed.
    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
    });

    // Receive message from the webview.
    webview.onDidReceiveMessage(e => {
      switch (e.type) {

      }
    });

    updateWebview();

  }

  /**
   * Get the static html used for the editor webviews.
   */
  private getHtmlForWebview(webview: vscode.Webview, document: vscode.TextDocument): string {
    // Local path to script and css for the webview
    const configUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'examples', 'tailwind.config.js'));

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
      </head>
      <body>
        ${ content }
      </body>
      </html>`;
  }
}
