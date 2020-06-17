# 微信公众号排版编辑器 (wechat-format-cli)

转化 Markdown 到给微信特制的 HTML（受 [微信公众号排版编辑器](https://github.com/lyricat/wechat-format) 的启发，刚好自己又有这个需求）

## 如何使用

> 前提：确保已经安装 npm。[如何安装 npm（安装 node.js 会自带 npm）](http://www.runoob.com/nodejs/nodejs-install-setup.html)

1. 打开 Terminal
2. 执行如下脚本
<pre>
npm install wechat-format-cli && cd ./node_modules/wechat-format-cli && npm start <b>your_md_path.md</b>
</pre>
3. Ctrl/Command + V 到微信公众号编辑器

> 1.1.0 版本依赖 puppeteer，若安装失败可以参考[这里](https://github.com/cnpm/cnpmjs.org/issues/1246#issuecomment-359148058)

## CHANGELOG

<details>
<summary>1.1.0</summary>
</br>
<p>1. 利用 puppeteer 实现复制 html，替换原来纯文本带标签的方式</p>
</details>

## 优点

- 继承了[微信公众号排版编辑器](https://github.com/lyricat/wechat-format)的优点（当然也有 bug。。）
- 不需要网页编辑
- 生成后的微信特制 HTML 直接复制到粘贴板，打开微信公众号编辑器直接粘贴

## 关于我

我是 Linus。如果你喜欢我的工具，可以：

- 给这个项目加星 https://github.com/LinusLing/wechat-format-cli

