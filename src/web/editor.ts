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
  commands,
} from 'vscode';

import {
  getNonce,
  parseHtml,
  select1,
} from './util';

const SSI_REGEX = /<!--[ ]*#([a-z]+)([ ]+([a-z]+)="(.+?)")*[ ]*-->/g;
const enum SSIDirecive {
  include = 'include',
  exec = 'exec',
  echo = 'echo',
  config = 'config',
};
type SSIParam = SSIIncludeParam | SSIExecParam | SSIEchoParam | SSIConfigParam;
const enum SSIIncludeParam {
  file = 'file',
  virtual = 'virtual',
};
const enum SSIExecParam {
  cgi = 'cgi',
  cmd = 'cmd',
};
const enum SSIEchoParam {
  var = 'var',
};
const enum SSIConfigParam {
  timefmt = 'timefmt',
  sizefmt = 'sizefmt',
  errmsg = 'errmsg',
}

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

  public static readonly viewType = 'tailwind.editor';

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

  private rootPath: Uri;

  constructor(
    private readonly context: ExtensionContext
  ) {
    this.rootPath = workspace.workspaceFolders?.[0]?.uri || Uri.file("/");
   }

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
      enableCommandUris: true,
    };
    // Sets up initial page.
    const content = await this.getContent(document);
    webview.html = this.getHtmlForWebview(webview, content);

    // Hook up event handlers so that we can synchronize the webview with the text document.
    //
    // The text document acts as our model, so we have to sync change in the document to our
    // editor and sync changes in the editor back to the document.
    //
    // Remember that a single text document can also be shared between multiple custom
    // editors (this happens for example when you split a custom editor).

    // Here, we only
    const saveDocumentSubscription = workspace.onDidSaveTextDocument(savedDocument => {
      if (savedDocument.uri.toString() === document.uri.toString()) {
        this.updateWebview(webview, document);
      }
    });

    // Make sure we get rid of the listener when our editor is closed.
    webviewPanel.onDidDispose(() => {
      saveDocumentSubscription.dispose();
    });

    // Receive message from the webview.
    webview.onDidReceiveMessage(({type, payload}) => {
      switch (type) {
        case 'mutations':
          this.applyMutations(document, payload);
          break;
      }
    });
  }

  /**
   * Get the static html used for the editor webviews.
   */
  private getHtmlForWebview(webview: Webview, body: string): string {
    const rootPath = this.rootPath;
    const baseUri = webview.asWebviewUri(rootPath);
    const extensionUri = this.context.extensionUri;

    // Local path to script and css for the webview
    const scriptUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, 'media', 'editor.mjs')
    );

    const configUri = webview.asWebviewUri(
      Uri.joinPath(rootPath, 'examples', 'tailwind.config.js')
    );

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
      </head>

      <body is="tailwind-editor">
        ${body}
        <script nonce="${nonce}" crossorigin src="https://unpkg.com/get-xpath"></script>
        <script nonce="${nonce}" crossorigin src="https://bundle.run/nanomorph@5.4.3"></script>
        <script nonce="${nonce}" type="module" src="${scriptUri}"></script>
      </body>
      </html>`;
  }

  /**
   * Gets the main HTML content of the document
   */
  private async getContent(document: TextDocument): Promise<string> {
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

    const uri = document.uri;
    const extname = '.' + uri.path.substring(uri.path.lastIndexOf(".") + 1);

    // We only process SSI if settings allow this extension.
    const ssiSettings: string[] = workspace.getConfiguration('tailwind.editor').get('serverSideIncludes', ['.shtml']);
    if (ssiSettings.indexOf(extname) === -1) {
      return content;
    }

    const promises: Promise<string>[] = [];
    // We can't do async replace, so we store the replacements as promises instead.
    content.replace(SSI_REGEX, (match, directive: SSIDirecive, _, param: SSIParam, value: string) => {
      // Only handle `include` directive for now.
      if (directive !== SSIDirecive.include) return match;

      // @TODO: handle between `file` or `virtual` param.

      const includeUri = Uri.joinPath(uri, '..', value);
      const thenable =
        workspace.openTextDocument(includeUri)
        .then(includedDocument => this.getContent(includedDocument))
        .then(html => {
          const args = [
            includeUri
          ];
          const commandUri = Uri.parse(`command:tailwind.editor.open?${encodeURIComponent(JSON.stringify(args))}`);
          return html.replace(/^<([a-z-]+) /, `<vscode-portal is="$1" src="${commandUri}" `);
        });
      promises.push(Promise.resolve(thenable));

      return match;
    });

    // We now await all the promises to get the list of includes.
    const includes = await Promise.all(promises);

    // One more run to replace SSI with actual include content.
    return content.replace(SSI_REGEX, () => includes.shift() || '');
  }

  private async updateWebview(webview: Webview, document: TextDocument) {
    const content = await this.getContent(document);
    return webview.postMessage({
      type: 'update',
      content,
    });
  }

  /**
   * Applies a list of mutations to a text document.
   */
  private applyMutations(document: TextDocument, mutations: any[]):void {
    const doc = parseHtml(document.getText());
    let changed = false;

    mutations.forEach(mutation => {
      const {
        type,
        attributeName,
        oldValue,
        newValue,
        xpath,
      } = mutation;

      if (xpath === "/html/body") return;

      const target = select1(xpath.replace("/html/body/", "//"), doc);
      target.setAttribute(attributeName, newValue);
      changed = true;
    });

    if (!changed) return;

    const edit = new WorkspaceEdit();
    // Just replace the entire document every time for now.
    // A more complete extension should compute minimal edits instead.
    edit.replace(
      document.uri,
      new Range(0, 0, document.lineCount, 0),
      doc.toString().replace(` xmlns="http://www.w3.org/1999/xhtml"`, '')
    );
    workspace.applyEdit(edit);
  }
}
