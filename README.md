# 安装

通过以下命令基于此模板创建一个新项目：

```bash
npm init cnblogx [project-name]
```

在项目的根目录下执行以下命令，安装依赖：

```bash
npm install
```

# 起步

## 首次部署

1. 执行编译：

   ```bash
   npm run build
   ```

2. 将`dist/`下的生成物复制到[博客园-管理-设置](<https://i.cnblogs.com/settings>)的对应选项中：

   - 将`custom.css`的内容复制到*页面定制CSS代码*中。
   - 将`custom.html`的内容复制到*页脚HTML代码*中。

   保存博客后台设置。

## 开发者模式

> 请确保已经完成[首次部署](#首次部署)。

1. 启动一个本地服务器，它将监视代码变化并将其应用到博客页面中：
   ```bash
   npm run dev
   ```

2. 在浏览器中打开自己的博客，双击页脚的*Copyright © 你的名字*，进入开发者模式。

3. 在`src/`下对应的文件中编写代码：

   - `main.ejs`：HTML/EJS（兼容，后缀不可更改）。
   - `main.js`：Javascript/Typescript（后缀可更改）。
   - `main.scss`：CSS/SCSS（兼容，后缀不可更改）。

   浏览器中的页面将得到更新。

4. 再次双击页脚的*Copyright © 你的名字*，可退出开发者模式。


# 命令手册

## 编译命令

```bash
npm run <script> -- [--env <options>[=<value>]] ...
```

---

其中`<script>`为以下任意值：

- 为调试环境编译：

  - `dev`：启动本地服务器，监视代码变化并及时更新模块。

    ```bash
    npm run dev
    ```

- 为生产环境编译：

  - `build`：希望将代码应用到博客的推荐方式。

    - 将代码分别打包为`.css`与`.html`文件，对应*页面定制CSS代码*与*页脚HTML代码*。

    ```bash
    npm run build
    ```

  - `packed`：基础配置，默认将所有代码打包为一个`.html`文件。

    ```bash
    npm run packed
    ```

---

其中`<options>`，为以下任意值：

- `PORT`：指定（博客页面发出连接、本地服务器监听）所用的端口。

  - `<value>`为一个数字，默认为`6454`。
  - 适用于**为生产环境编译**与**为调试环境编译**。
  - 博客中已有的代码与调试环境的代码应当配置**相同的端口**。

  ```bash
  # 在调试环境下：本地服务器将监听端口8080。
  npm run dev -- --env PORT=8080 
  # 在开发者模式下：博客页面将从端口8080请求模块更新。
  npm run build -- --env PORT=8080 
  ```

  ---

- `STANDALONE_JS`：单独打包`.js`文件。

  - `<value>`为空或`NOREF`。
  - 适用于**为生产环境编译**。

  ```bash
  # 生成.html与.js两个文件。
  npm run packed -- --env STANDALONE_JS 
  # 同上，且.html文件不再引入.js文件。
  npm run packed -- --env STANDALONE_JS=NOREF 
  ```

  ---

- `STANDALONE_CSS`：单独打包`.css`文件。

  - `<value>`为空或`NOREF`。
  - 适用于**为生产环境编译**。
  
  ```bash
  # 生成.html与.css两个文件。
  npm run packed -- --env STANDALONE_CSS 
  # 同上，且.html文件不再引入.css文件，等价于build命令。
  npm run packed -- --env STANDALONE_CSS=NOREF 
  ```
  
  ---
  
- `PUBLIC_PATH`：在`.html`引入`.css`或`.js`文件时，被用于指定资源路径。

  - `<value>`为一个URL。
  - 适用于**为生产环境编译**。

  ```bash
  # 将.js文件托管到自己的网站上。
  npm run packed -- --env STANDALONE_JS --env PUBLIC_PATH="//mywebsite.me/scripts/"
  ```
  
  ---
  
- `PRESERVE_CSS`：在博客页面接入本地服务器时，不移除原有的CSS样式。

  - 适用于**为调试环境编译**。

  ```bash
  # 不希望博客上的第三方主题受到影响。
  npm run dev -- --env PRESERVE_CSS
  ```

## 控制台命令

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
