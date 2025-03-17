import * as vscode from "vscode";
import { getWebviewContent } from "./webviewContent";
import * as path from "path";

export class RulesWebviewProvider implements vscode.WebviewViewProvider, vscode.Disposable {
  public static readonly viewType = "codingRulesSidebar";
  public static readonly explorerViewType = "codingRulesExplorer";
  private _view?: vscode.WebviewView;
  private _webviewPanel?: vscode.WebviewPanel;

  constructor(private readonly _context: vscode.ExtensionContext) {
    console.log('RulesWebviewProvider构造函数被调用');
  }

  public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): void {
    console.log('resolveWebviewView被调用');
    this._view = webviewView;
    
    // 配置WebView选项
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(path.join(this._context.extensionPath))]
    };
    
    // 设置HTML内容
    webviewView.webview.html = getWebviewContent();
    
    // 处理消息
    webviewView.webview.onDidReceiveMessage((message) => {
      console.log('收到webview消息:', message);
      if (message.command === "generateRules") {
        this.saveRulesFile(message.rulesContent, message.directory, message.filename);
      }
    });
    
    // 显示欢迎信息
    vscode.window.showInformationMessage('AI协同规则生成器视图已加载');
  }

  public createWebviewPanel(): void {
    console.log('createWebviewPanel被调用');
    // 如果已经有侧边栏视图，激活它
    if (this._view) {
      console.log('已存在视图，尝试显示它');
      const viewColumn = vscode.window.activeTextEditor?.viewColumn || vscode.ViewColumn.One;
      this._view.show(true);
      return;
    }
    
    console.log('创建新的webview面板');
    // 否则创建一个新的webview面板
    this._webviewPanel = vscode.window.createWebviewPanel(
      "codingRules",
      "AI 协同规则生成器",
      vscode.ViewColumn.One,
      { 
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(this._context.extensionPath))]
      }
    );
    
    this._webviewPanel.webview.html = getWebviewContent();

    this._webviewPanel.webview.onDidReceiveMessage((message) => {
      console.log('收到webview面板消息:', message);
      if (message.command === "generateRules") {
        this.saveRulesFile(message.rulesContent, message.directory, message.filename);
      }
    });
    
    // 处理面板关闭事件
    this._webviewPanel.onDidDispose(() => {
      console.log('webview面板被关闭');
      this._webviewPanel = undefined;
    });
  }

  private async saveRulesFile(content: string, directory: string = "./", filename: string = ".cursorrules"): Promise<void> {
    console.log('saveRulesFile被调用, 目录:', directory, '文件名:', filename);
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage("请打开一个工作区目录！");
      return;
    }

    let basePath = workspaceFolders[0].uri.fsPath;
    // 处理目录，如果不是以.或/开头，添加./
    if (!directory.startsWith('.') && !directory.startsWith('/') && !directory.startsWith('\\')) {
      directory = './' + directory;
    }
    
    // 确保目录以/结尾
    if (!directory.endsWith('/') && !directory.endsWith('\\')) {
      directory += '/';
    }
    
    // 构建完整路径
    const targetDir = path.resolve(basePath, directory);
    const filePath = path.join(targetDir, filename);
    
    try {
      // 确保目录存在
      const fs = require('fs');
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // 写入文件
      fs.writeFileSync(filePath, content);
      vscode.window.showInformationMessage(`规则文件 "${filename}" 已成功创建！`);
      console.log('文件已成功写入:', filePath);
    } catch (error) {
      console.error('写入文件时出错:', error);
      vscode.window.showErrorMessage(`创建规则文件失败: ${error}`);
    }
  }

  public dispose(): void {
    console.log('RulesWebviewProvider.dispose被调用');
    if (this._webviewPanel) {
      this._webviewPanel.dispose();
    }
  }
}
