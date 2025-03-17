import * as vscode from "vscode";

export declare class RulesWebviewProvider implements vscode.WebviewViewProvider, vscode.Disposable {
  static readonly viewType: string;
  constructor(context: vscode.ExtensionContext);
  resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): void;
  createWebviewPanel(): void;
  dispose(): void;
} 