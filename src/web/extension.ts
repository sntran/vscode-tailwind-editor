// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  ExtensionContext,
  Uri,
  commands,
  window,
  workspace,
} from 'vscode';
import { TailwindEditorProvider } from './editor';
import { TailwindEditorView } from './view';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

  // Register our custom editor providers
  context.subscriptions.push(TailwindEditorProvider.register(context));

  // Register our views
  context.subscriptions.push(TailwindEditorView.register(context));

  // Register our custom commands.
  commands.registerCommand('tailwind.editor.open', (resource: Uri) => {
    const workspaceFolders = workspace.workspaceFolders;
    if (!workspaceFolders) {
      window.showErrorMessage("Opening files with Tailwind Editor currently requires opening a workspace");
      return;
    }

    commands.executeCommand('vscode.openWith', resource, TailwindEditorProvider.viewType);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
