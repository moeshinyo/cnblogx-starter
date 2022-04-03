# 安装

通过以下命令基于此模板创建一个新项目：

```bash
npm init cnblogx [project-name]
```

项目建立后，在项目的根目录安装依赖：

```bash
npm install
```

# 起步

## 首次部署

1. 执行编译：

   ```bash
   npm run build
   ```

2. 将`dist/`下的生成物复制到*[博客园-管理-设置](<https://i.cnblogs.com/settings>)*的对应选项中：

   - 将`custom.css`的内容复制到*页面定制CSS代码*中。
   - 将`custom.html`的内容复制到*页脚HTML代码*中。

   保存博客后台设置。

## 开发者模式

> 请确保已经完成[首次部署](#首次部署)。

1. 启动本机开发服务器，它将监视代码变化并将其应用到博客页面中：
   ```bash
   npm run dev
   ```

2. 在浏览器中打开自己的博客，双击页脚的*Copyright © 你的名字*，进入开发者模式。

3. 编辑`src/`下对应的文件代码：

   - `main.ejs`：HTML/EJS（兼容，后缀不可更改）。
   - `main.js`：Javascript/Typescript（后缀可更改）。
   - `main.scss`：CSS/SCSS（兼容，后缀不可更改）。

   浏览器中的页面将得到更新。

4. 再次双击页脚的*Copyright © 你的名字*，可退出开发者模式。


# 命令

## 编译命令

```bash
npm run <script> -- [--env <options>[=<value>]] ...
```

其中`<script>`为以下任意值：

- `dev`：为调试环境编译：启动本机服务器，监视代码变化并及时更新模块。
- `build`：为生产环境编译：期望应用到博客园设置时的选择。
- `packed`：为生产环境编译，默认将所有代码打包为单个`html`文件。

其中`<options>`，为以下任意值：

- `PORT`：配置调试服务器端口。

  - `<value>`为一个数字，默认为`6454`。
  - 适用于**为生产环境编译**与**为调试环境编译**。
  - 博客中已有的代码与调试环境的代码应当配置**相同的端口**。

  ```bash
  # 在调试环境下：本机服务器将监听端口8080。
  npm run dev -- --env PORT=8080 
  # 在开发者模式下：博客页面将从端口8080请求模块更新。
  npm run build -- --env PORT=8080 
  ```

  ---

- `STANDALONE_JS`：单独打包`js`文件。

  - `<value>`为空或`NOREF`。
  - 适用于**为生产环境编译**。

  ```bash
  # 生成.html与.js两个文件。
  npm run packed -- --env STANDALONE_JS 
  # 同上，且.html文件不再引入.js文件。
  npm run packed -- --env STANDALONE_JS=NOREF 
  ```

  ---

- `STANDALONE_CSS`：单独打包`css`文件。

  - `<value>`为空或`NOREF`。
  - 适用于**为生产环境编译**。
  
  ```bash
  # 生成.html与.css两个文件。
  npm run packed -- --env STANDALONE_CSS 
  # 同上，且.html文件不再引入.css文件，等价于build命令。
  npm run packed -- --env STANDALONE_CSS=NOREF 
  ```
  
- `PUBLIC_PATH`：在`.html`引入`.css`或`.js`文件时，被用于指定资源路径。

  - `<value>`为一个URL。
  - 适用于**为生产环境编译**。

  ```bash
  # 将.js文件托管到自己的网站上。
  npm run packed -- --env STANDALONE_JS --env PUBLIC_PATH="mywebsite.com/scripts/"
  ```

## 浏览器命令

以下命令可在浏览器的控制台中执行：

- `cnblogx_development`：获取或设置*是否启用开发者模式*。
  
  - 与*双击页脚进入/退出开发者模式*等价。

  ```bash
  # 判断是否处于开发者模式。
  cnblogx_development()
  # 进入开发者模式。
  cnblogx_development(true);
  # 退出开发者模式。
  cnblogx_development(false);
  ```
  
