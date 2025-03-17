/**
 * 生成Webview内容的函数
 * @returns 返回HTML内容
 */
export function getWebviewContent(): string {
    return `<!DOCTYPE html>
  <html lang="zh">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      :root {
        --bg-color: #1e1e1e;
        --text-color: #e0e0e0;
        --border-color: #3e3e3e;
        --section-bg: #252526;
        --hover-color: #3e3e42;
        --accent-color: #0e639c;
        --accent-hover: #1177bb;
        --input-bg: #3c3c3c;
        --input-border: #3e3e3e;
      }
      
      body { 
        font-family: Arial, sans-serif; 
        padding: 0; 
        margin: 0;
        color: var(--text-color);
        background-color: var(--bg-color);
        height: 100vh;
        overflow: hidden;
      }
      
      h2 { 
        color: var(--text-color); 
        margin-top: 0;
        font-size: 24px;
        border-bottom: 1px solid var(--accent-color);
        padding-bottom: 10px;
        margin-bottom: 15px;
      }
      
      h5 {
        margin: 0;
        font-size: 18px;
        display: flex;
        align-items: center;
      }
      
      h4 {
        margin: 10px 0;
        font-size: 16px;
        color: var(--text-color);
      }
      
      .section-title {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        color: var(--text-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        user-select: none;
      }
      
      .section-subtitle {
        margin: 15px 0 10px 0;
        font-size: 14px;
        font-weight: bold;
        color: var(--text-color);
      }
      
      .subsection {
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px dashed var(--border-color);
      }
      
      .subsection:first-child {
        margin-top: 15px;
        padding-top: 0;
        border-top: none;
      }
      
      .subsection-title {
        font-size: 14px;
        font-weight: bold;
        color: var(--text-color);
        margin-bottom: 12px;
        padding-left: 10px;
        border-left: 3px solid var(--accent-color);
      }
      
      .section-content {
        margin-top: 12px;
        background-color: rgba(63, 63, 65, 0.5);
        padding: 12px;
        border-radius: 4px;
      }
      
      .container {
        display: flex;
        height: 100vh;
        width: 100%;
      }
      
      .form-panel {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        max-height: 100vh;
        scrollbar-width: thin;
        scrollbar-color: var(--accent-color) var(--bg-color);
      }
      
      /* 自定义滚动条样式 */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: var(--bg-color);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: var(--accent-color);
      }
      
      .preview-panel {
        flex: 1;
        border-left: 1px solid var(--border-color);
        padding: 20px;
        display: flex;
        flex-direction: column;
        max-height: 100vh;
        overflow-y: auto;
      }
      
      .section { 
        border: 1px solid var(--border-color); 
        padding: 15px; 
        margin-bottom: 15px; 
        border-radius: 5px; 
        background-color: var(--section-bg);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      
      .toggle-btn { 
        cursor: pointer; 
        font-weight: bold; 
        color: var(--text-color); 
        user-select: none;
        display: flex;
        align-items: center;
        line-height: 1.2;
        width: 100%;
        justify-content: space-between;
      }
      
      .toggle-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        color: var(--text-color);
        font-size: 14px;
        transition: transform 0.2s ease;
      }
      
      .toggle-btn:hover { 
        color: var(--accent-color); 
      }
      
      .toggle-btn:hover .toggle-icon {
        color: var(--accent-color);
      }
      
      .hidden { display: none; }
      
      .indent { margin-left: 20px; }
      
      .sub-section { 
        margin-top: 15px; 
        border-left: 1px solid var(--accent-color); 
        padding-left: 15px;
        margin-bottom: 15px;
      }
      
      .option-group {
        margin-bottom: 15px;
      }
      
      .option-item {
        margin-bottom: 8px;
      }
      
      .section-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        padding: 5px 0;
        border-bottom: 1px solid var(--border-color);
        cursor: pointer;
      }
      
      .section-toggle .toggle-text {
        font-weight: bold;
        font-size: 14px;
        color: var(--text-color);
      }
      
      .section-toggle:hover .toggle-text {
        color: var(--accent-color);
      }
      
      .toggle-switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
      }
      
      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--input-border);
        transition: .3s;
        border-radius: 20px;
      }
      
      .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: var(--text-color);
        transition: .3s;
        border-radius: 50%;
      }
      
      input:checked + .slider {
        background-color: var(--accent-color);
      }
      
      input:checked + .slider:before {
        transform: translateX(20px);
      }
      
      pre { 
        background: var(--input-bg); 
        padding: 10px; 
        border-radius: 5px; 
        overflow: auto;
        flex: 1;
        margin: 0;
        margin-top: 10px;
      }
      
      #preview-content {
        background: var(--input-bg); 
        padding: 10px; 
        border-radius: 5px; 
        overflow: auto;
        flex: 1;
        margin: 0;
        margin-top: 10px;
        color: var(--text-color);
        font-family: monospace;
        white-space: pre-wrap;
        outline: none;
        border: 1px solid var(--input-border);
        scrollbar-width: thin;
        scrollbar-color: var(--accent-color) var(--bg-color);
      }
      
      #preview-content::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      #preview-content::-webkit-scrollbar-track {
        background: var(--bg-color);
        border-radius: 4px;
      }
      
      #preview-content::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 4px;
      }
      
      #preview-content::-webkit-scrollbar-thumb:hover {
        background: var(--accent-color);
      }
      
      .inline-options {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
      
      .inline-options > div {
        margin-right: 15px;
        margin-bottom: 5px;
      }
      
      .radio-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
      
      .radio-group > div {
        margin-right: 15px;
        margin-bottom: 5px;
      }
      
      .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
      
      .checkbox-group > div {
        margin-right: 20px;
        margin-bottom: 5px;
        min-width: 150px;
      }
      
      .inline-radio-group {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
      }
      
      .inline-radio-group > div {
        margin-right: 20px;
      }
      
      .generate-options {
        margin-top: 15px;
        padding: 15px;
        border-top: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      
      .generate-options .field {
        display: flex;
        align-items: center;
        margin-right: 15px;
        margin-bottom: 10px;
        flex: 1;
        min-width: 150px;
        max-width: 40%;
      }
      
      .generate-options .field-label {
        min-width: 70px;
        white-space: nowrap;
      }
      
      .generate-options select {
        width: 100%;
        margin-top: 0;
        height: 31px;
      }
      
      .generate-options button {
        margin-top: 0;
        white-space: nowrap;
        height: 31px;
      }
      
      button { 
        padding: 8px 15px; 
        background: var(--accent-color); 
        color: var(--text-color); 
        border: none; 
        border-radius: 3px; 
        cursor: pointer; 
        margin-top: 20px; 
      }
      
      button:hover { background: var(--accent-hover); }
      
      input[type="checkbox"], input[type="radio"] { 
        margin-right: 8px; 
        vertical-align: middle; 
        accent-color: var(--accent-color);
      }
      
      label { 
        margin-right: 15px; 
        user-select: none; 
        color: var(--text-color);
      }
      
      textarea { 
        width: 100%; 
        height: 80px; 
        margin-top: 5px; 
        background: var(--input-bg); 
        color: var(--text-color); 
        border: 1px solid var(--input-border); 
        padding: 5px; 
        border-radius: 3px;
        scrollbar-width: thin;
        scrollbar-color: var(--accent-color) var(--bg-color);
      }
      
      textarea::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      textarea::-webkit-scrollbar-track {
        background: var(--bg-color);
        border-radius: 4px;
      }
      
      textarea::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 4px;
      }
      
      textarea::-webkit-scrollbar-thumb:hover {
        background: var(--accent-color);
      }
      
      input[type="text"] { 
        width: 100%; 
        margin-top: 5px; 
        background: var(--input-bg);
        color: var(--text-color); 
        border: 1px solid var(--input-border); 
        padding: 5px;
        border-radius: 3px;
      }
      
      select { 
        background: var(--input-bg); 
        color: var(--text-color); 
        border: 1px solid var(--input-border); 
        padding: 5px; 
        border-radius: 3px; 
      }
      
      .field { margin-bottom: 0px; }
      .field-label { font-weight: bold; margin-bottom: 3px; }
      
      .preview-title {
        margin-bottom: 10px;
        font-weight: bold;
        color: var(--text-color);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="form-panel">
        <h2>Coding Rules Generator</h2>
        <p>项目开发AI协同规则，使用 Cursor/Windsurf 等IED工具，通过选择下面的选项，设置项目的编程标准规则</p>
        <!-- 通用规则设置部分 -->
        <div class="section">
          <div class="toggle-btn" onclick="toggleSection('generalOptions')">
            <span class="section-title">通用规则设置</span>
            <span class="toggle-icon">&#9662;</span>
          </div>
          <div id="generalOptions" class="section-content">
            <div class="field">
              <div class="field-label">角色提示词:</div>
              <textarea id="role-prompt" value="例如: 你是一位高级开发工程师，你的工作是帮我完成项目设计和开发，在开发过程中一定要遵循以下规则..." oninput="updatePreview();">你是一位高级开发工程师，你的工作是帮我完成项目设计和开发，在开发过程中一定要遵循以下规则</textarea>
            </div>
            
            <div class="field" style="margin-top: 15px;">
              <div class="field-label">沟通语言:</div>
              <div class="option-group">
                <div class="radio-group">
                  <div class="option-item">
                    <input type="radio" name="language-type" id="lang-zh" value="zh" checked onchange="updatePreview();"> 
                    <label for="lang-zh">中文</label>
                  </div>
                  <div class="option-item">
                    <input type="radio" name="language-type" id="lang-en" value="en" onchange="updatePreview();"> 
                    <label for="lang-en">英文</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 命名规范部分 -->
        <div class="section">
          <div class="toggle-btn" onclick="toggleSection('namingOptions')">
            <span class="section-title">命名规范</span>
            <span class="toggle-icon">&#9662;</span>
          </div>
          <div id="namingOptions" class="section-content">
            <div class="subsection">
              <div class="subsection-title" onclick="toggleOptionSection('enable-naming')">
                启用命名规范
                <label class="toggle-switch" style="float: right; margin-top: -2px;">
                  <input type="checkbox" id="enable-naming" checked onchange="updatePreview();">
                  <span class="slider"></span>
                </label>
              </div>
              
              <div class="subsection-title">命名规则</div>
              <!-- 主要命名风格 -->
              <div class="option-group">
                <div class="radio-group">
                  <div class="option-item">
                    <input type="radio" name="naming" id="camelCase" value="camelCase" checked onchange="updateSubOptions('naming'); updatePreview();"> 
                    <label for="camelCase">驼峰命名法 (camelCase)</label>
                  </div>
                  <div class="option-item">
                    <input type="radio" name="naming" id="snake_case" value="snake_case" onchange="updateSubOptions('naming'); updatePreview();"> 
                    <label for="snake_case">蛇形命名法 (snake_case)</label>
                  </div>
                  <div class="option-item">
                    <input type="radio" name="naming" id="PascalCase" value="PascalCase" onchange="updateSubOptions('naming'); updatePreview();"> 
                    <label for="PascalCase">帕斯卡命名法 (PascalCase)</label>
                  </div>
                  <div class="option-item">
                    <input type="radio" name="naming" id="kebab-case" value="kebab-case" onchange="updateSubOptions('naming'); updatePreview();"> 
                    <label for="kebab-case">短横线命名法 (kebab-case)</label>
                  </div>
                </div>
              </div>
            
              <!-- 驼峰命名法子选项 -->
              <div id="camelCase-options" class="sub-section">
                <div class="section-subtitle">驼峰命名法细则:</div>
                <div class="indent">
                  <div class="option-item">
                    <input type="checkbox" id="camelCase-variables" checked onchange="updatePreview();"> 
                    <label for="camelCase-variables">变量使用驼峰 (firstName)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="camelCase-functions" checked onchange="updatePreview();"> 
                    <label for="camelCase-functions">函数使用驼峰 (getData())</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="camelCase-private" checked onchange="updatePreview();"> 
                    <label for="camelCase-private">私有属性前缀 (_privateVar)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="camelCase-methods" checked onchange="updatePreview();"> 
                    <label for="camelCase-methods">方法使用驼峰 (calculateTotal())</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="camelCase-params" checked onchange="updatePreview();"> 
                    <label for="camelCase-params">参数使用驼峰 (userName)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="camelCase-files" checked onchange="updatePreview();"> 
                    <label for="camelCase-files">文件名使用驼峰 (userProfile.js)</label>
                  </div>
                </div>
              </div>
            
              <!-- 蛇形命名法子选项 -->
              <div id="snake_case-options" class="sub-section hidden">
                <div class="section-subtitle">蛇形命名法细则:</div>
                <div class="indent">
                  <div class="option-item">
                    <input type="checkbox" id="snake-variables" checked onchange="updatePreview();"> 
                    <label for="snake-variables">变量使用蛇形 (first_name)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="snake-constants" checked onchange="updatePreview();"> 
                    <label for="snake-constants">常量使用大写蛇形 (MAX_COUNT)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="snake-functions" checked onchange="updatePreview();"> 
                    <label for="snake-functions">函数使用蛇形 (get_data())</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="snake-methods" checked onchange="updatePreview();"> 
                    <label for="snake-methods">方法使用蛇形 (calculate_total())</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="snake-params" checked onchange="updatePreview();"> 
                    <label for="snake-params">参数使用蛇形 (user_name)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="snake-files" checked onchange="updatePreview();"> 
                    <label for="snake-files">文件名使用蛇形 (user_profile.js)</label>
                  </div>
                </div>
              </div>
            
              <!-- 帕斯卡命名法子选项 -->
              <div id="PascalCase-options" class="sub-section hidden">
                <div class="section-subtitle">帕斯卡命名法细则:</div>
                <div class="indent">
                  <div class="option-item">
                    <input type="checkbox" id="pascal-classes" checked onchange="updatePreview();"> 
                    <label for="pascal-classes">类使用帕斯卡 (UserProfile)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="pascal-interfaces" checked onchange="updatePreview();"> 
                    <label for="pascal-interfaces">接口前缀 I (IUserProfile)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="pascal-variables" checked onchange="updatePreview();"> 
                    <label for="pascal-variables">变量使用帕斯卡 (FirstName)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="pascal-functions" checked onchange="updatePreview();"> 
                    <label for="pascal-functions">函数使用帕斯卡 (GetData())</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="pascal-components" checked onchange="updatePreview();"> 
                    <label for="pascal-components">组件使用帕斯卡 (UserProfile)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="pascal-files" checked onchange="updatePreview();"> 
                    <label for="pascal-files">文件名使用帕斯卡 (UserProfile.js)</label>
                  </div>
                </div>
              </div>
            
              <!-- 短横线命名法子选项 -->
              <div id="kebab-case-options" class="sub-section hidden">
                <div class="section-subtitle">短横线命名法细则:</div>
                <div class="indent">
                  <div class="option-item">
                    <input type="checkbox" id="kebab-files" checked onchange="updatePreview();"> 
                    <label for="kebab-files">文件名使用短横线 (user-profile.js)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="kebab-components" checked onchange="updatePreview();"> 
                    <label for="kebab-components">组件名使用短横线 (&lt;user-profile&gt;)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="kebab-routes" checked onchange="updatePreview();"> 
                    <label for="kebab-routes">路由路径使用短横线 (/user-profile)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="kebab-css" checked onchange="updatePreview();"> 
                    <label for="kebab-css">CSS类名使用短横线 (.user-card)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="kebab-attributes" checked onchange="updatePreview();"> 
                    <label for="kebab-attributes">HTML属性使用短横线 (data-user-id)</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="kebab-folders" checked onchange="updatePreview();"> 
                    <label for="kebab-folders">文件夹名使用短横线 (user-components/)</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- 代码风格部分 -->
        <div class="section">
          <div class="toggle-btn" onclick="toggleSection('codeStyleOptions')">
            <span class="section-title">代码风格</span>
            <span class="toggle-icon">&#9662;</span>
          </div>
          <div id="codeStyleOptions" class="section-content">
            <div class="subsection">
              <div class="subsection-title" onclick="toggleOptionSection('enable-code-style')">
                启用代码风格
                <label class="toggle-switch" style="float: right; margin-top: -2px;">
                  <input type="checkbox" id="enable-code-style" checked onchange="updatePreview();">
                  <span class="slider"></span>
                </label>
              </div>
              
              <div class="subsection-title">缩进风格</div>
              <!-- 缩进风格 -->
              <div class="option-group">
                <div class="inline-radio-group">
                  <div class="option-item">
                    <input type="radio" name="indentation" id="spaces" value="spaces" checked onchange="updateSubOptions('indentation'); updatePreview();"> 
                    <label for="spaces">空格</label>
                  </div>
                  <div class="option-item">
                    <input type="radio" name="indentation" id="tabs" value="tabs" onchange="updateSubOptions('indentation'); updatePreview();"> 
                    <label for="tabs">制表符</label>
                  </div>
                </div>
              </div>
            
              <!-- 空格缩进子选项 -->
              <div id="spaces-options" class="sub-section">
                <div class="indent">
                  <label for="spaces-count">空格数量:</label>
                  <select id="spaces-count" onchange="updatePreview();">
                    <option value="2">2空格</option>
                    <option value="4" selected>4空格</option>
                    <option value="8">8空格</option>
                  </select>
                </div>
              </div>
            
              <!-- 制表符缩进子选项 -->
              <div id="tabs-options" class="sub-section hidden">
                <div class="indent">
                  <label for="tabs-equivalent">制表符等效于几个空格:</label>
                  <select id="tabs-equivalent" onchange="updatePreview();">
                    <option value="2">2空格</option>
                    <option value="4" selected>4空格</option>
                    <option value="8">8空格</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="subsection">
              <div class="subsection-title">括号风格</div>
              <div class="option-group">
                <div class="indent">
                  <input type="radio" name="braces" id="same-line" value="same-line" checked onchange="updatePreview();"> 
                  <label for="same-line">同行 (if { ... })</label>
                  
                  <input type="radio" name="braces" id="new-line" value="new-line" onchange="updatePreview();"> 
                  <label for="new-line">新行 (if&lt;br&gt;{ ... })</label>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- 注释规范部分 -->
        <div class="section">
          <div class="toggle-btn" onclick="toggleSection('commentOptions')">
            <span class="section-title">注释规范</span>
            <span class="toggle-icon">&#9662;</span>
          </div>
          <div id="commentOptions" class="section-content">
            <div class="subsection">
              <div class="subsection-title" onclick="toggleOptionSection('enable-block-comments')">
                启用块注释规范
                <label class="toggle-switch" style="float: right; margin-top: -2px;">
                  <input type="checkbox" id="enable-block-comments" checked onchange="updatePreview();">
                  <span class="slider"></span>
                </label>
              </div>
              
              <div class="subsection-title">块注释规范</div>
              <!-- 主要注释风格选项 -->
              <div class="option-group">
                <div class="radio-group">
                  <div class="option-item">
                    <input type="radio" name="block-comment-type" id="jsdoc-type" value="jsdoc" checked onchange="updateSubOptions('block-comment-type'); updatePreview();"> 
                    <label for="jsdoc-type">JSDoc风格 (/** ... */)</label>
                  </div>
                  <div class="option-item">
                    <input type="radio" name="block-comment-type" id="standard-type" value="standard" onchange="updateSubOptions('block-comment-type'); updatePreview();"> 
                    <label for="standard-type">标准块注释 (/* ... */)</label>
                  </div>
                </div>
              </div>
            
              <!-- JSDoc风格子选项 -->
              <div id="jsdoc-type-options" class="sub-section">
                <div class="section-subtitle">JSDoc细则:</div>
                <div class="indent">
                  <div class="option-item">
                    <input type="checkbox" id="jsdoc-require-class" checked onchange="updatePreview();"> 
                    <label for="jsdoc-require-class">类必须有JSDoc注释</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="jsdoc-require-function" checked onchange="updatePreview();"> 
                    <label for="jsdoc-require-function">函数必须有JSDoc注释</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="jsdoc-require-params" checked onchange="updatePreview();"> 
                    <label for="jsdoc-require-params">必须注释所有参数</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="jsdoc-require-returns" checked onchange="updatePreview();"> 
                    <label for="jsdoc-require-returns">必须注释返回值</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="jsdoc-require-types" checked onchange="updatePreview();"> 
                    <label for="jsdoc-require-types">必须包含类型信息</label>
                  </div>
                  <div style="margin-top: 10px;">
                    <div class="section-subtitle">JSDoc模板:</div>
                    <textarea id="jsdoc-template" oninput="updatePreview();">/**
 * 函数描述
 * @param {type} name - 参数描述
 * @returns {type} 返回值描述
 */</textarea>
                  </div>
                </div>
              </div>
            
              <!-- 标准块注释子选项 -->
              <div id="standard-type-options" class="sub-section hidden">
                <div class="section-subtitle">标准块注释细则:</div>
                <div class="indent">
                  <div class="option-item">
                    <input type="checkbox" id="standard-require-class" checked onchange="updatePreview();"> 
                    <label for="standard-require-class">类必须有块注释</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="standard-require-function" checked onchange="updatePreview();"> 
                    <label for="standard-require-function">函数必须有块注释</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="standard-require-sections" checked onchange="updatePreview();"> 
                    <label for="standard-require-sections">代码分段必须有块注释</label>
                  </div>
                  <div style="margin-top: 10px;">
                    <div class="section-subtitle">标准块注释模板:</div>
                    <textarea id="standard-template" oninput="updatePreview();">/*
 * 函数名称: functionName
 * 功能描述: 这个函数的作用是...
 * 参数: param1 - 参数1的描述
 *      param2 - 参数2的描述
 * 返回值: 返回值的描述
 */</textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="subsection">
              <div class="subsection-title" onclick="toggleOptionSection('enable-line-comments')">
                启用行注释规范
                <label class="toggle-switch" style="float: right; margin-top: -2px;">
                  <input type="checkbox" id="enable-line-comments" checked onchange="updatePreview();">
                  <span class="slider"></span>
                </label>
              </div>
              
              <div class="subsection-title">行级注释规范</div>
              <div class="option-group">
                <div class="indent">
                  <div class="option-item">
                    <input type="checkbox" id="line-above-code" onchange="updatePreview();"> 
                    <label for="line-above-code">代码上方必须有注释</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="line-end-of-line" checked onchange="updatePreview();"> 
                    <label for="line-end-of-line">不允许行尾注释</label>
                  </div>
                  <div class="option-item">
                    <input type="checkbox" id="line-complex-logic" checked onchange="updatePreview();"> 
                    <label for="line-complex-logic">复杂逻辑必须有注释</label>
                  </div>
                  <div style="margin-top: 10px;">
                    <div class="section-subtitle">行级注释示例:</div>
                      <textarea id="line-template" oninput="updatePreview();">  // 注释内容
</textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 技术栈配置部分 -->
        <div class="section">
          <div class="toggle-btn" onclick="toggleSection('techStackOptions')">
            <span class="section-title">技术栈配置</span>
            <span class="toggle-icon">&#9662;</span>
          </div>
          <div id="techStackOptions" class="section-content">
            <div class="subsection">
              <div class="subsection-title" onclick="toggleOptionSection('enable-tech-stack')">
                启用技术栈配置
                <label class="toggle-switch" style="float: right; margin-top: -2px;">
                  <input type="checkbox" id="enable-tech-stack" checked onchange="updatePreview();">
                  <span class="slider"></span>
                </label>
              </div>
              
              <div class="subsection-title">前端技术栈</div>
              <div class="field">
                <input type="text" id="frontend-stack" placeholder="例如: React + TypeScript, Vue3 + JavaScript" oninput="updatePreview();" />
              </div>
            </div>
            
            <div class="subsection">
              <div class="subsection-title">后端技术栈</div>
              <div class="field">
                <input type="text" id="backend-stack" placeholder="例如: Node.js + Express, Spring Boot + Java, Django + Python" oninput="updatePreview();" />
              </div>
            </div>
            
            <div class="subsection">
              <div class="subsection-title">其他技术配置</div>
              <div class="field">
                <input type="text" id="other-tech" placeholder="例如: MongoDB, Redis, Docker, AWS" oninput="updatePreview();" />
              </div>
            </div>
            <div class="subsection">
              <div class="subsection-title">版本要求</div>
              <div class="field" style="margin-top: 10px;">
                <textarea id="version-requirements" placeholder="例如:
Node.js >= 16.0.0
npm >= 8.0.0
React >= 18.0.0" oninput="updatePreview();"></textarea>
              </div>
            </div>
          </div>
        </div>
      
        <!-- 协同开发规范部分 -->
        <div class="section">
          <div class="toggle-btn" onclick="toggleSection('collaborationOptions')">
            <span class="section-title">协同开发规范</span>
            <span class="toggle-icon">&#9662;</span>
          </div>
          <div id="collaborationOptions" class="section-content">
            <div class="subsection">
              <div class="subsection-title" onclick="toggleOptionSection('enable-collaboration')">
                启用协同开发规范
                <label class="toggle-switch" style="float: right; margin-top: -2px;">
                  <input type="checkbox" id="enable-collaboration" checked onchange="updatePreview();">
                  <span class="slider"></span>
                </label>
              </div>
              
              <div class="subsection-title">协同开发规范</div>
              <div class="field">
                <div>
                  <input type="checkbox" id="update-directory" checked onchange="updatePreview();"> 
                  <label for="update-directory">项目目录更新</label>
                </div>
                <div class="indent" style="margin-top: 5px;">
                  <p style="margin: 0 0 5px 0; font-size: 0.9em; color: #aaa;">
                    启用后，AI将被提示在生成或修改文件时更新.struct_rules文件，记录项目结构
                  </p>
                </div>
              </div>
              
              <div class="field" style="margin-top: 15px;">
                <div>
                  <input type="checkbox" id="track-requirements" checked onchange="updatePreview();"> 
                  <label for="track-requirements">需求追踪</label>
                </div>
                <div class="indent" style="margin-top: 5px;">
                  <p style="margin: 0 0 5px 0; font-size: 0.9em; color: #aaa;">
                    启用后，AI将被提示在讨论新需求时更新.prd_rules文件，记录需求变更
                  </p>
                </div>
              </div>
            </div>
            
            <div class="subsection">
              <div class="subsection-title">项目目录结构模板</div>
              <div class="field">
                <textarea id="file-structure" style="height:200px;" placeholder="例如:
src/
  components/  # React组件
  services/    # API服务
  utils/       # 工具函数
  assets/      # 静态资源
  styles/      # 样式文件" oninput="updatePreview();"></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 其他规则部分 -->
        <div class="section">
          <div class="toggle-btn" onclick="toggleSection('customOptions')">
            <span class="section-title">其他规则</span>
            <span class="toggle-icon">&#9662;</span>
          </div>
          <div id="customOptions" class="section-content">
            <div class="subsection">
              <div class="subsection-title" onclick="toggleOptionSection('enable-custom-rules')">
                启用其他规则
                <label class="toggle-switch" style="float: right; margin-top: -2px;">
                  <input type="checkbox" id="enable-custom-rules" checked onchange="updatePreview();">
                  <span class="slider"></span>
                </label>
              </div>
              
              <div class="subsection-title">规则内容</div>
              <div class="option-group">
                <textarea id="custom-rules" placeholder="在这里添加不属于上述分类的其他规则或者约束/限制项，每行一条..." oninput="updatePreview();"></textarea>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
      
      <div class="preview-panel">
        <div class="preview-title">规则预览:</div>
        <div id="preview-content"></div>
        
        <div class="generate-options">
          <div class="field">
            <div class="field-label" style="font-weight: 120;">开发工具:</div>
            <select id="ai-tool-type" onchange="updateRulesFilename()">
              <option value="cursor">Cursor</option>
              <option value="windsurf">Windsurf</option>
              <option value="other">其他</option>
            </select>
          </div>
          
          <div class="field">
            <div class="field-label" style="font-weight: 120;">保存目录:</div>
            <input type="text" id="rules-directory" value="./" placeholder="项目根目录" />
          </div>
          
          <div class="field">
            <div class="field-label" style="font-weight: 120;">文件名:</div>
            <input type="text" id="rules-filename" value=".cursorrules" placeholder=".cursorrules" />
          </div>
          
          <button onclick="generateRules()" style="margin-top: -5px;">生成规则</button>
        </div>
      </div>
    </div>
  
    <script>
      const vscode = acquireVsCodeApi();
  
      // 切换部分显示/隐藏
      function toggleSection(id) {
        var section = document.getElementById(id);
        var toggleIcon = section.previousElementSibling.querySelector('.toggle-icon');
        
        section.classList.toggle("hidden");
        
        if (section.classList.contains("hidden")) {
          toggleIcon.innerHTML = "&#9662;"; // 向下折线 (▾)
          toggleIcon.style.transform = "rotate(0deg)";
        } else {
          toggleIcon.innerHTML = "&#9662;"; // 保持同一个符号，通过旋转实现向上效果
          toggleIcon.style.transform = "rotate(180deg)";
        }
        
        // 如果展开了某个section，更新预览
        if (!section.classList.contains("hidden")) {
          updatePreview();
        }
      }
      
      // 切换配置项启用/禁用
      function toggleOptionSection(id) {
        var checkbox = document.getElementById(id);
        checkbox.checked = !checkbox.checked;
        updatePreview();
      }
      
      // 更新子选项
      function updateSubOptions(category) {
        if (category === 'naming') {
          // 隐藏所有命名法子选项
          document.getElementById('camelCase-options').classList.add('hidden');
          document.getElementById('snake_case-options').classList.add('hidden');
          document.getElementById('PascalCase-options').classList.add('hidden');
          document.getElementById('kebab-case-options').classList.add('hidden');
          
          // 显示当前选中的命名法子选项
          const selected = document.querySelector('input[name="naming"]:checked').value;
          document.getElementById(selected + '-options').classList.remove('hidden');
        } else if (category === 'indentation') {
          // 隐藏所有缩进子选项
          document.getElementById('spaces-options').classList.add('hidden');
          document.getElementById('tabs-options').classList.add('hidden');
          
          // 显示当前选中的缩进子选项
          const selected = document.querySelector('input[name="indentation"]:checked').value;
          document.getElementById(selected + '-options').classList.remove('hidden');
        } else if (category === 'block-comment-type') {
          // 隐藏所有块注释类型子选项
          document.getElementById('jsdoc-type-options').classList.add('hidden');
          document.getElementById('standard-type-options').classList.add('hidden');
          
          // 显示当前选中的块注释类型子选项
          const selected = document.querySelector('input[name="block-comment-type"]:checked').value;
          document.getElementById(selected + '-type-options').classList.remove('hidden');
        }
      }
      
      // 预览区域编辑处理
      function previewEdited() {
        // 获取编辑后的内容
        const editedContent = document.getElementById("preview-content").innerText;
        
        // 发送消息到插件，更新内容
        vscode.postMessage({ 
          command: "previewEdited", 
          editedContent: editedContent 
        });
      }
      
      // 更新预览内容
      function updatePreview() {
        try {
          // 收集命名规范
          const enableNaming = document.getElementById('enable-naming').checked;
          let namingRules = [];
          let namingStyle = '';
          
          if (enableNaming) {
            const namingStyleInput = document.querySelector('input[name="naming"]:checked');
            if (namingStyleInput) {
              namingStyle = namingStyleInput.value;
              
              if (namingStyle === 'camelCase') {
                if (document.getElementById('camelCase-variables') && document.getElementById('camelCase-variables').checked) namingRules.push('变量使用驼峰命名法 (firstName)');
                if (document.getElementById('camelCase-functions') && document.getElementById('camelCase-functions').checked) namingRules.push('函数使用驼峰命名法 (getData())');
                if (document.getElementById('camelCase-private') && document.getElementById('camelCase-private').checked) namingRules.push('私有属性使用下划线前缀 (_privateVar)');
                if (document.getElementById('camelCase-methods') && document.getElementById('camelCase-methods').checked) namingRules.push('方法使用驼峰命名法 (calculateTotal())');
                if (document.getElementById('camelCase-params') && document.getElementById('camelCase-params').checked) namingRules.push('参数使用驼峰命名法 (userName)');
                if (document.getElementById('camelCase-files') && document.getElementById('camelCase-files').checked) namingRules.push('文件名使用驼峰命名法 (userProfile.js)');
              } else if (namingStyle === 'snake_case') {
                if (document.getElementById('snake-variables') && document.getElementById('snake-variables').checked) namingRules.push('变量使用蛇形命名法 (first_name)');
                if (document.getElementById('snake-constants') && document.getElementById('snake-constants').checked) namingRules.push('常量使用大写蛇形命名法 (MAX_COUNT)');
                if (document.getElementById('snake-functions') && document.getElementById('snake-functions').checked) namingRules.push('函数使用蛇形命名法 (get_data())');
                if (document.getElementById('snake-methods') && document.getElementById('snake-methods').checked) namingRules.push('方法使用蛇形命名法 (calculate_total())');
                if (document.getElementById('snake-params') && document.getElementById('snake-params').checked) namingRules.push('参数使用蛇形命名法 (user_name)');
                if (document.getElementById('snake-files') && document.getElementById('snake-files').checked) namingRules.push('文件名使用蛇形命名法 (user_profile.js)');
              } else if (namingStyle === 'PascalCase') {
                if (document.getElementById('pascal-classes') && document.getElementById('pascal-classes').checked) namingRules.push('类使用帕斯卡命名法 (UserProfile)');
                if (document.getElementById('pascal-interfaces') && document.getElementById('pascal-interfaces').checked) namingRules.push('接口使用I前缀 (IUserProfile)');
                if (document.getElementById('pascal-variables') && document.getElementById('pascal-variables').checked) namingRules.push('变量使用帕斯卡命名法 (FirstName)');
                if (document.getElementById('pascal-functions') && document.getElementById('pascal-functions').checked) namingRules.push('函数使用帕斯卡命名法 (GetData())');
                if (document.getElementById('pascal-components') && document.getElementById('pascal-components').checked) namingRules.push('组件使用帕斯卡命名法 (UserProfile)');
                if (document.getElementById('pascal-files') && document.getElementById('pascal-files').checked) namingRules.push('文件名使用帕斯卡命名法 (UserProfile.js)');
              } else if (namingStyle === 'kebab-case') {
                if (document.getElementById('kebab-files') && document.getElementById('kebab-files').checked) namingRules.push('文件名使用短横线命名法 (user-profile.js)');
                if (document.getElementById('kebab-components') && document.getElementById('kebab-components').checked) namingRules.push('组件名使用短横线命名法 (<user-profile>)');
                if (document.getElementById('kebab-routes') && document.getElementById('kebab-routes').checked) namingRules.push('路由路径使用短横线命名法 (/user-profile)');
                if (document.getElementById('kebab-css') && document.getElementById('kebab-css').checked) namingRules.push('CSS类名使用短横线命名法 (.user-card)');
                if (document.getElementById('kebab-attributes') && document.getElementById('kebab-attributes').checked) namingRules.push('HTML属性使用短横线命名法 (data-user-id)');
                if (document.getElementById('kebab-folders') && document.getElementById('kebab-folders').checked) namingRules.push('文件夹名使用短横线命名法 (user-components/)');
              }
            } else {
              console.warn("没有找到命名风格选择器");
            }
          }
          
          // 收集缩进风格
          const enableCodeStyle = document.getElementById('enable-code-style') && document.getElementById('enable-code-style').checked;
          let indentStyle = 'spaces';
          let indentValue = '4空格';
          let bracesStyle = 'same-line';
          
          if (enableCodeStyle) {
            const indentInput = document.querySelector('input[name="indentation"]:checked');
            if (indentInput) {
              indentStyle = indentInput.value;
              
              if (indentStyle === 'spaces') {
                const spacesCount = document.getElementById('spaces-count');
                if (spacesCount) {
                  indentValue = spacesCount.value + '空格';
                }
              } else {
                const tabsEquiv = document.getElementById('tabs-equivalent');
                if (tabsEquiv) {
                  indentValue = '制表符 (等同于' + tabsEquiv.value + '空格)';
                }
              }
              
              // 收集代码风格 - 仅括号风格
              const bracesInput = document.querySelector('input[name="braces"]:checked');
              if (bracesInput) {
                bracesStyle = bracesInput.value;
              }
            }
          }
          
          // 收集注释规范
          const blockCommentRules = [];
          const lineCommentRules = [];
          let blockCommentTemplate = '';
          let lineCommentTemplate = '';
          let blockCommentType = 'jsdoc';
          
          // 块注释规则
          const enableBlockComments = document.getElementById('enable-block-comments') && document.getElementById('enable-block-comments').checked;
            
          if (enableBlockComments) {
            const blockTypeInput = document.querySelector('input[name="block-comment-type"]:checked');
            if (blockTypeInput) {
              blockCommentType = blockTypeInput.value;
              
              if (blockCommentType === 'jsdoc') {
                if (document.getElementById('jsdoc-require-class') && document.getElementById('jsdoc-require-class').checked) blockCommentRules.push('类必须有JSDoc风格注释');
                if (document.getElementById('jsdoc-require-function') && document.getElementById('jsdoc-require-function').checked) blockCommentRules.push('函数必须有JSDoc风格注释');
                if (document.getElementById('jsdoc-require-params') && document.getElementById('jsdoc-require-params').checked) blockCommentRules.push('必须注释所有参数 (@param)');
                if (document.getElementById('jsdoc-require-returns') && document.getElementById('jsdoc-require-returns').checked) blockCommentRules.push('必须注释返回值 (@returns)');
                if (document.getElementById('jsdoc-require-types') && document.getElementById('jsdoc-require-types').checked) blockCommentRules.push('必须包含类型信息 ({type})');
                
                const jsdocTemplate = document.getElementById('jsdoc-template');
                if (jsdocTemplate) {
                  blockCommentTemplate = jsdocTemplate.value;
                }
              } else if (blockCommentType === 'standard') {
                if (document.getElementById('standard-require-class') && document.getElementById('standard-require-class').checked) blockCommentRules.push('类必须有块注释');
                if (document.getElementById('standard-require-function') && document.getElementById('standard-require-function').checked) blockCommentRules.push('函数必须有块注释');
                if (document.getElementById('standard-require-sections') && document.getElementById('standard-require-sections').checked) blockCommentRules.push('代码分段必须有块注释');
                
                const standardTemplate = document.getElementById('standard-template');
                if (standardTemplate) {
                  blockCommentTemplate = standardTemplate.value;
                }
              }
            }
          }
            
          // 行注释规则
          const enableLineComments = document.getElementById('enable-line-comments') && document.getElementById('enable-line-comments').checked;
            
          if (enableLineComments) {
            if (document.getElementById('line-above-code') && document.getElementById('line-above-code').checked) lineCommentRules.push('代码上方必须有行注释');
            if (document.getElementById('line-end-of-line') && document.getElementById('line-end-of-line').checked) lineCommentRules.push('不允许行尾注释');
            if (document.getElementById('line-complex-logic') && document.getElementById('line-complex-logic').checked) lineCommentRules.push('复杂逻辑必须有注释');
            
            const lineTemplate = document.getElementById('line-template');
            if (lineTemplate) {
              lineCommentTemplate = lineTemplate.value;
            }
          }
          
          // 收集技术栈配置
          const enableTechStack = document.getElementById('enable-tech-stack') && document.getElementById('enable-tech-stack').checked;
          let frontendStack = '';
          let backendStack = '';
          let otherTech = '';
          let versionRequirements = '';
          
          if (enableTechStack) {
            const frontendInput = document.getElementById('frontend-stack');
            if (frontendInput) frontendStack = frontendInput.value;
            
            const backendInput = document.getElementById('backend-stack');
            if (backendInput) backendStack = backendInput.value;
            
            const otherTechInput = document.getElementById('other-tech');
            if (otherTechInput) otherTech = otherTechInput.value;
            
            const versionInput = document.getElementById('version-requirements');
            if (versionInput) versionRequirements = versionInput.value;
          }
          
          // 收集协同开发规范
          const enableCollaboration = document.getElementById('enable-collaboration') && document.getElementById('enable-collaboration').checked;
          let updateDirectory = false;
          let trackRequirements = false;
          let fileStructure = '';
          
          if (enableCollaboration) {
            const updateDirInput = document.getElementById('update-directory');
            if (updateDirInput) updateDirectory = updateDirInput.checked;
            
            const trackReqInput = document.getElementById('track-requirements');
            if (trackReqInput) trackRequirements = trackReqInput.checked;
            
            const fileStructInput = document.getElementById('file-structure');
            if (fileStructInput) fileStructure = fileStructInput.value;
          }
          
          // 收集其他规则
          const enableCustomRules = document.getElementById('enable-custom-rules') && document.getElementById('enable-custom-rules').checked;
          let customRules = [];
          
          if (enableCustomRules) {
            const customRulesInput = document.getElementById('custom-rules');
            if (customRulesInput) {
              customRules = customRulesInput.value.split('\\n').filter(rule => rule.trim() !== '');
            }
          }
          
          // 收集通用规则设置
          let rolePrompt = '';
          const rolePromptInput = document.getElementById('role-prompt');
          if (rolePromptInput) {
            rolePrompt = rolePromptInput.value;
          }
          
          let languageType = 'zh';
          const langTypeInput = document.querySelector('input[name="language-type"]:checked');
          if (langTypeInput) {
            languageType = langTypeInput.value;
          }
          
          // 生成Markdown内容
          let content = "";
          
          // 添加角色提示词（如果有）
          if (rolePrompt) {
            content += rolePrompt + "\\n\\n";
          }
          
          content += "# 项目协助开发规则\\n\\n";
          
          // 代码风格部分 - 如果启用
          if (enableCodeStyle) {
            content += "## 代码风格\\n";
            content += "- **缩进方式**: " + indentStyle + " (" + indentValue + ")\\n";
            content += "- **括号风格**: " + (bracesStyle === 'same-line' ? '与控制语句同行' : '新行') + "\\n\\n";
          }
          
          // 命名规范部分 - 如果启用
          if (enableNaming) {
            content += "## 命名规范\\n";
            content += "- **主要风格**: " + namingStyle + "\\n";
            namingRules.forEach(rule => {
              content += "  - " + rule + "\\n";
            });
            content += "\\n";
          }
          
          // 注释规范部分 - 根据块注释和行注释的开关检查，不再依赖整体开关
          if (enableBlockComments || enableLineComments) {
            content += "## 注释规范\\n";
            
            // 块注释规则
            if (enableBlockComments && blockCommentRules.length > 0) {
              content += "### 块注释规则\\n";
              content += "- **风格**: " + (blockCommentType === 'jsdoc' ? 'JSDoc风格' : '标准块注释风格') + "\\n";
              blockCommentRules.forEach(rule => {
                content += "  - " + rule + "\\n";
              });
              content += "\\n";
              
              content += "#### 块注释模板:\\n";
              content += "\`\`\`code\\n" + blockCommentTemplate + "\\n\`\`\`\\n\\n";
            }
            
            // 行注释规则
            if (enableLineComments && lineCommentRules.length > 0) {
              content += "### 行级注释规则\\n";
              lineCommentRules.forEach(rule => {
                content += "  - " + rule + "\\n";
              });
              content += "\\n";
              
              content += "#### 行级注释示例:\\n";
              content += "\`\`\`code\\n" + lineCommentTemplate + "\\n\`\`\`\\n\\n";
            }
          }
          
          // 技术栈部分 - 如果启用
          if (enableTechStack && (frontendStack || backendStack || otherTech || versionRequirements)) {
            content += "## 技术栈\\n";
            if (frontendStack) content += "- **前端技术栈**: " + frontendStack + "\\n";
            if (backendStack) content += "- **后端技术栈**: " + backendStack + "\\n";
            if (otherTech) content += "- **其他技术栈**: " + otherTech + "\\n";
            
            if (versionRequirements) {
              content += "\\n### 版本要求\\n";
              content += "\`\`\`\\n" + versionRequirements + "\\n\`\`\`\\n";
            }
            content += "\\n";
          }
          
          // 协同开发规范 - 如果启用
          if (enableCollaboration && (updateDirectory || trackRequirements)) {
            content += "## 协同开发规范\\n";
            
            // 项目目录更新
            if (updateDirectory) {
              content += "### 项目目录更新\\n";
              content += "- 当生成新文件或修改目录结构时，请更新.struct_rules文件以记录项目结构\\n\\n";
              
              if (fileStructure) {
                content += "#### 目录结构模板\\n";
                content += "\`\`\`\\n" + fileStructure + "\\n\`\`\`\\n\\n";
              }
            }
            
            // 需求追踪
            if (trackRequirements) {
              content += "### 需求追踪\\n";
              content += "- 当讨论新需求或需求变更时，请更新.prd_rules文件以记录需求变更\\n\\n";
            }
          }
          
          // 其他规则部分 - 如果启用
          if (enableCustomRules && customRules.length > 0) {
            content += "## 其他规则\\n";
            customRules.forEach(rule => {
              content += "- " + rule + "\\n";
            });
          }
          
          // 添加语言类型
          content += "\\n---\\n";
          content += "请使用 " + (languageType === 'zh' ? '中文' : 'English') + " 进行沟通\\n";
          
          // 更新预览
          const previewContent = document.getElementById("preview-content");
          if (previewContent) {
            previewContent.innerText = content;
          } else {
            console.error("找不到预览内容元素");
          }
        } catch (error) {
          console.error("更新预览内容时出错:", error);
          // 尝试恢复显示至少一些内容
          const previewContent = document.getElementById("preview-content");
          if (previewContent) {
            previewContent.innerText = "预览生成过程中出现错误，请检查控制台获取详细信息。";
          }
        }
      }
      
      // 更新文件名
      function updateRulesFilename() {
        const aiTool = document.getElementById('ai-tool-type').value;
        let filename = '.cursorrules';
        
        if (aiTool === 'windsurf') {
          filename = '.windsurfrules';
        } else if (aiTool === 'other') {
          filename = '.otherrules';
        }
        
        document.getElementById('rules-filename').value = filename;
      }
      
      // 生成规则
      function generateRules() {
        // 获取预览内容
        const content = document.getElementById("preview-content").innerText;
        
        // 获取保存目录和文件名
        const directory = document.getElementById("rules-directory").value || "./";
        const filename = document.getElementById("rules-filename").value || ".cursorrules";
        
        // 发送消息到插件
        vscode.postMessage({ 
          command: "generateRules", 
          rulesContent: content,
          directory: directory,
          filename: filename
        });
      }
      
      // 初始化显示正确的子选项
      updateSubOptions('naming');
      updateSubOptions('indentation');
      updateSubOptions('block-comment-type');
      
      // 默认只展开第一个部分，其他全部折叠
      // toggleSection('generalOptions'); // 第一个部分默认展开，不调用
      toggleSection('namingOptions');
      toggleSection('codeStyleOptions');
      toggleSection('commentOptions');
      toggleSection('techStackOptions');
      toggleSection('collaborationOptions');
      toggleSection('customOptions');
      
      // 初始化预览
      updatePreview();
    </script>
  </body>
  </html>`;
  }
  