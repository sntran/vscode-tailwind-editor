// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TailwindEditorProvider } from './editor';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Register our custom editor providers
  let disposable = TailwindEditorProvider.register(context);

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
