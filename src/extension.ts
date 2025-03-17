import * as vscode from "vscode";
import { RulesWebviewProvider } from "./RulesWebviewProvider";
import { getWebviewContent } from "./webviewContent";

export function activate(context: vscode.ExtensionContext) {
  console.log('激活AI协同规则生成器扩展 - 开始');
  
  try {
    // 创建规则生成器提供者
    console.log('创建RulesWebviewProvider实例');
    const provider = new RulesWebviewProvider(context);
    
    // 注册侧边栏视图提供者
    console.log('注册侧边栏WebviewViewProvider, viewType:', RulesWebviewProvider.viewType);
    const sidebarViewRegistration = vscode.window.registerWebviewViewProvider(
      RulesWebviewProvider.viewType,
      provider
    );
    console.log('侧边栏WebviewViewProvider注册完成');
    context.subscriptions.push(sidebarViewRegistration);
    
    // 注册资源管理器视图提供者
    console.log('注册资源管理器WebviewViewProvider, viewType:', RulesWebviewProvider.explorerViewType);
    const explorerViewRegistration = vscode.window.registerWebviewViewProvider(
      RulesWebviewProvider.explorerViewType,
      provider
    );
    console.log('资源管理器WebviewViewProvider注册完成');
    context.subscriptions.push(explorerViewRegistration);
    
    // 注册命令
    console.log('注册命令: coding-rules-generator.createRules');
    let disposable = vscode.commands.registerCommand(
      "coding-rules-generator.createRules",
      async () => {
        console.log('执行命令: coding-rules-generator.createRules');
        // 打开生成规则的面板
        provider.createWebviewPanel();
      }
    );

    // 添加到订阅中
    context.subscriptions.push(disposable);
    context.subscriptions.push(provider);
    
    // 显示扩展已激活的消息
    vscode.window.showInformationMessage('AI协同规则生成器已激活!');
    console.log('激活AI协同规则生成器扩展 - 完成');
    
    // 列出所有已注册的命令
    vscode.commands.getCommands(true).then(commands => {
      const ourCommands = commands.filter(cmd => cmd.includes('coding-rules'));
      console.log('已注册的coding-rules命令:', ourCommands);
    });
  } catch (error) {
    console.error('激活过程中发生错误:', error);
  }
}

export function deactivate() {
  console.log('AI协同规则生成器扩展已停用');
}
