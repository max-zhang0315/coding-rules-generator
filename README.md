# Cursor规则生成器

这是一个VS Code扩展，用于生成Cursor的项目规则文件。

## 功能

- 提供一个图形界面，可以方便地配置项目的编码规则
- 生成符合Cursor规范的.cursorrules文件
- 支持多种命名规范选择

## 使用方法

1. 安装扩展后，在命令面板中输入 `创建Cursor规则` 来打开规则生成器
2. 在生成器界面中选择所需的规则配置
3. 点击"生成规则"按钮，将在当前工作区根目录生成`.cursorrules`文件

## 开发

### 构建与运行

```bash
# 安装依赖
npm install

# 编译扩展
npm run compile

# 运行扩展（按F5在新窗口中调试）
```

### 项目结构

- `src/extension.ts`: 扩展的入口文件
- `src/RulesWebviewProvider.ts`: 提供Webview逻辑的类
- `src/webviewContent.ts`: Webview内容生成函数

## 许可证

MIT 