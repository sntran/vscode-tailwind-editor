import {
  CancellationToken,
  Disposable,
  ExtensionContext,
  Uri,
  Webview,
  WebviewViewProvider,
  WebviewView,
  WebviewViewResolveContext,
  window,
} from 'vscode';

import {
  getNonce,
} from './util';

/**
 * WebviewViewProvider for styling options for selected element on editor.
 */
export class TailwindEditorView implements WebviewViewProvider {
  public static readonly viewType = 'tailwind.editor.view';

  public static register(context: ExtensionContext): Disposable {
    const provider = new TailwindEditorView(context);
    const providerRegistration = window.registerWebviewViewProvider(TailwindEditorView.viewType, provider, {
      webviewOptions: {
        retainContextWhenHidden: true,
      }
    });
    return providerRegistration;
  }

  constructor(
		private readonly context: ExtensionContext
	) { }

  public resolveWebviewView(
		webviewView: WebviewView,
		_context: WebviewViewResolveContext,
		_token: CancellationToken,
	) {
    const webview = webviewView.webview;

    webview.options = {
			enableScripts: true,
		};

    webview.html = this.getHtmlForWebview(webview);

    webview.onDidReceiveMessage(data => {

		});
  }

  private getHtmlForWebview(webview: Webview): string {
    const toolkitUri = webview.asWebviewUri(
      Uri.joinPath(
        this.context.extensionUri,
        'node_modules',
        '@vscode',
        'webview-ui-toolkit',
        'dist',
        'toolkit.js',
      )
    );
    const codiconsUri = webview.asWebviewUri(
      Uri.joinPath(
        this.context.extensionUri,
        'node_modules',
        '@vscode/codicons',
        'dist',
        'codicon.css',
      )
    );

    // Use a nonce to only allow a specific script to be run.
		const nonce = getNonce();

    return /* html */`
      <!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webview.cspSource}; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link href="${codiconsUri}" rel="stylesheet" />

        <script nonce="${nonce}" type="module" src="${toolkitUri}"></script>
        <script nonce="${nonce}" src="https://cdn.tailwindcss.com"></script>

				<title>Tailwind Editor View</title>
			</head>
			<body>
        <main>
          <details class="group">
            <summary
              class="
                flex items-center
                -mx-5 px-1

                border-t border-t-[color:var(--vscode-sideBarSectionHeader-border)]
                group-first-of-type:border-t-transparent

                cursor-pointer
                marker:content-none
              "
            >
              <i
                class="
                  codicon codicon-chevron-right
                  transition
                  group-open:rotate-90
                "
              ></i> Layout
            </summary>

            <vscode-radio-group>
              <label slot="label">Display</label>
              <vscode-radio>Block</vscode-radio>
              <vscode-radio>Flex</vscode-radio>
              <vscode-radio>Grid</vscode-radio>
              <vscode-radio>Inline Block</vscode-radio>
              <vscode-radio>Inline</vscode-radio>
              <vscode-radio>None</vscode-radio>
            </vscode-radio-group>
          </details>

          <details class="group">
            <summary
              class="
                flex items-center
                -mx-5 px-1

                border-t border-t-[color:var(--vscode-sideBarSectionHeader-border)]
                group-first-of-type:border-t-transparent

                cursor-pointer
                marker:content-none
              "
            >
              <i
                class="
                  codicon codicon-chevron-right
                  transition
                  group-open:rotate-90
                "
              ></i> Spacing
            </summary>
          </details>

          <details class="group">
            <summary
              class="
                flex items-center
                -mx-5 px-1

                border-t border-t-[color:var(--vscode-sideBarSectionHeader-border)]
                group-first-of-type:border-t-transparent

                cursor-pointer
                marker:content-none
              "
            >
              <i
                class="
                  codicon codicon-chevron-right
                  transition
                  group-open:rotate-90
                "
              ></i> Sizing
            </summary>

            <vscode-text-field type="text">Width</vscode-text-field>
            <vscode-text-field type="text">Height</vscode-text-field>
            <vscode-text-field type="text">Min W</vscode-text-field>
            <vscode-text-field type="text">Min H</vscode-text-field>
            <vscode-text-field type="text">Max W</vscode-text-field>
            <vscode-text-field type="text">Max H</vscode-text-field>
          </details>

          <details class="group">
            <summary
              class="
                flex items-center
                -mx-5 px-1

                border-t border-t-[color:var(--vscode-sideBarSectionHeader-border)]
                group-first-of-type:border-t-transparent

                cursor-pointer
                marker:content-none
              "
            >
              <i
                class="
                  codicon codicon-chevron-right
                  transition
                  group-open:rotate-90
                "
              ></i> Position
            </summary>

            <vscode-dropdown>
              <vscode-option>Static</vscode-option>
              <vscode-option>Relative</vscode-option>
              <vscode-option>Absolute</vscode-option>
              <vscode-option>Fixed</vscode-option>
              <vscode-option>Sticky</vscode-option>
            </vscode-dropdown>

            <vscode-radio-group>
              <label slot="label">Float</label>
              <vscode-radio>None</vscode-radio>
              <vscode-radio>Left</vscode-radio>
              <vscode-radio>Right</vscode-radio>
            </vscode-radio-group>

            <vscode-radio-group>
              <label slot="label">Clear</label>
              <vscode-radio>None</vscode-radio>
              <vscode-radio>Left</vscode-radio>
              <vscode-radio>Right</vscode-radio>
              <vscode-radio>Both</vscode-radio>
            </vscode-radio-group>
          </details>

          <details class="group">
            <summary
              class="
                flex items-center
                -mx-5 px-1

                border-t border-t-[color:var(--vscode-sideBarSectionHeader-border)]
                group-first-of-type:border-t-transparent

                cursor-pointer
                marker:content-none
              "
            >
              <i
                class="
                  codicon codicon-chevron-right
                  transition
                  group-open:rotate-90
                "
              ></i> Typography
            </summary>

            <vscode-dropdown>
              <vscode-option>Font</vscode-option>
            </vscode-dropdown>

            <vscode-dropdown>
              <vscode-option>100 - Thin</vscode-option>
              <vscode-option>200 - Extra Light</vscode-option>
              <vscode-option>300 - Light</vscode-option>
              <vscode-option>400 - Normal</vscode-option>
              <vscode-option>500 - Medium</vscode-option>
              <vscode-option>600 - Semi Bold</vscode-option>
              <vscode-option>700 - Bold</vscode-option>
              <vscode-option>800 - Extra Bold</vscode-option>
              <vscode-option>900 - Black</vscode-option>
            </vscode-dropdown>

            <vscode-text-field type="text">Size</vscode-text-field>
            <vscode-text-field type="text">Height</vscode-text-field>
          </details>

          <details class="group">
            <summary
              class="
                flex items-center
                -mx-5 px-1

                border-t border-t-[color:var(--vscode-sideBarSectionHeader-border)]
                group-first-of-type:border-t-transparent

                cursor-pointer
                marker:content-none
              "
            >
              <i
                class="
                  codicon codicon-chevron-right
                  transition
                  group-open:rotate-90
                "
              ></i> Backgrounds
            </summary>
          </details>

          <details class="group">
            <summary
              class="
                flex items-center
                -mx-5 px-1

                border-t border-t-[color:var(--vscode-sideBarSectionHeader-border)]
                group-first-of-type:border-t-transparent

                cursor-pointer
                marker:content-none
              "
            >
              <i
                class="
                  codicon codicon-chevron-right
                  transition
                  group-open:rotate-90
                "
              ></i> Borders
            </summary>
          </details>

          <details class="group">
            <summary
              class="
                flex items-center
                -mx-5 px-1

                border-t border-t-[color:var(--vscode-sideBarSectionHeader-border)]
                group-first-of-type:border-t-transparent

                cursor-pointer
                marker:content-none
              "
            >
              <i
                class="
                  codicon codicon-chevron-right
                  transition
                  group-open:rotate-90
                "
              ></i> Effects
            </summary>
          </details>

          <details class="group">
            <summary
              class="
                flex items-center
                -mx-5 px-1

                border-t border-t-[color:var(--vscode-sideBarSectionHeader-border)]
                group-first-of-type:border-t-transparent

                cursor-pointer
                marker:content-none
              "
            >
              <i
                class="
                  codicon codicon-chevron-right
                  transition
                  group-open:rotate-90
                "
              ></i> Filters
            </summary>
          </details>
        </main>
			</body>
			</html>`;
  }
}
