coding-rules-generator
│── .vscodeignore                 # VS Code 插件发布时忽略的文件
│── .gitignore                    # Git 忽略文件
│── package.json                  # 插件的元数据 & 依赖
│── tsconfig.json                  # TypeScript 配置
│── src
│   │── extension.ts              # 插件主入口
│   │── RulesWebviewProvider.ts   # Webview 侧边栏 UI 逻辑
│   │── webviewContent.ts         # Webview HTML & JS 交互逻辑
│── out                            # 编译后的 TypeScript 代码
│── README.md                     # 插件使用说明
│── CHANGELOG.md                  # 插件更新日志
│── coding-rules-generator.vsix   # 打包好的 VS Code 插件
