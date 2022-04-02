# 安装

通过以下命令基于此模板创建一个新项目：

```bash
npm init cnblogx <project-name>
```

# 起步

1. 安装项目依赖并执行编译。

   1. ```bash
      npm install
      ```

   2. ```bash
      npm run build
      ```

2. 将`dist/`下的生成物复制到*[博客园-管理-设置](<https://i.cnblogs.com/settings>)*的对应选项中：

   - 将`custom.css`的内容复制到*页面定制CSS代码*中。
   - 将`custom.html`的内容复制到*页脚HTML代码*中。

   保存博客后台设置。

   ---

   > *此后调试代码从下一步开始即可。*

3. 启动本机开发服务器，它将监视代码变化并及时更新模块：
   ```bash
   npm run dev
   ```

4. 在浏览器中打开自己的博客，双击页脚的*Copyright © 你的名字*，进入开发者模式。

5. 编辑`src/`下对应的文件代码，浏览器中的博客页面将得到更新：

   - `main.ejs`：HTML/EJS（兼容，后缀不可更改）。
   - `main.js`：Javascript/Typescript（后缀可更改）。
   - `main.scss`：CSS/SCSS（兼容，后缀不可更改）。

6. 再次双击页脚的*Copyright © 你的名字*，可退出开发者模式。
   
   ---

   > *开发者模式中的所有更改仅对本机可见，其他读者仍然能够正常阅读。*

7. 重复 1.2、2 两步将代码应用到博客，令所有读者可见。


# 命令

## 编译命令

```bash
npm run <script> [--env <option>[=<value>]]
```

其中`<script>`为以下任意值：

- `dev`：启动本机服务器，监视代码变化并及时更新模块。
- `build`：为生产环境编译：期望应用到博客园设置时的选择。
- `none`：仅编译打包，不作任何优化。
- `packed`：为生产环境编译，并将所有代码打包为单个`html`文件。
- `standalone`：为生产环境编译，将`.html`、`.js`、`.css`文件分别打包。

### 参数

其中`<option>`，为以下任意值：

- `PORT`：自定义本机服务器端口，博客园设置中的代码端口应与本机服务器的端口一致。

  - `<value>`为一个数字，默认为`6454`。例：

    ```bash
    npm run dev --env PORT=8080
    ```

  ---

- `STANDALONE_JS`：单独打包`js`文件，仅在为生产环境编译时有效。例：

  ```bash
  npm run packed --env STANDALONE_JS
  ```

  ---

- `STANDALONE_CSS`：单独打包`css`文件，仅在为生产环境编译时有效。例：

  ```bash
  npm run packed --env STANDALONE_CSS
  ```

## 浏览器命令

以下命令可在浏览器的控制台中执行：

- ```typescript
  cnblogx_development: ( () => boolean ) & ( (enable: boolean) => void )
  ```

  获取或设置*是否启用开发者模式*，等同于双击页脚时弹出的选项。

