# 一个比较简单的webpack脚手架

## 可以转换ES6、支持scss

```
# 1、 安装依赖
npm install

# 2、 开发
npm run dev， 默认监听8080，注意：默认路径为：http://localhost:8080/index.html,如果出险"Cannot GET /a.html"，请检查有没有index.html。

# 3、 打包
npm run build，默认在主目录下"dist"文件夹。
```
# 增加页面：
    可直接在根目录下config.js中增加一项。
    注：暂未做"Tree Shaking"（移除 JavaScript 上下文中的未引用代码）；暂未支持媒体文件。