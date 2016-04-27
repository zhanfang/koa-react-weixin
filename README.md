# koa-weixin
基于koa的微信公众平台管理项目

## 运行项目
### production
  // 在public文件夹下面生成bundle.js和vendor.js
  NODE_ENV=production webpack
  // 然后启动服务器
  NODE_ENV=production nodemon server.js --exec babel-node

### dev
  DEBUG=wx NODE_ENV=start nodemon server.js --exec babel-node
