// 导出模块声明
declare module "./RulesWebviewProvider" {
  import * as vscode from "vscode";
  
  export class RulesWebviewProvider implements vscode.WebviewViewProvider, vscode.Disposable {
    static readonly viewType: string;
    constructor(context: vscode.ExtensionContext);
    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): void;
    createWebviewPanel(): void;
    dispose(): void;
  }
}

declare module "./webviewContent" {
  export function getWebviewContent(): string;
} 