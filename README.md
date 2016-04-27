# koa-weixin
> 基于koa的微信公众平台管理
该工程主要是用来管理微信公众平台的自动回复，之后可能会陆续完善其他功能

后台采用的关键技术如下：
- nginx:做端口转发；
- mongodb:做数据存储；
- redis:中间层处理；
- koa:后台路由处理；

前端关键技术
- react:渲染基础；
- react-router&&react-router-redux:路由处理基础；
- redux:状态管理；
- antd:插件和样式管理基础；

## 运行
有两种模式可以运行该工程
- production:在这种模式下会压缩bundle.js等文件，并且会生成bundle.js和vendor.js在public目录下；
- dev:热加载模式；

### production
```javascript
// 在public文件夹下面生成bundle.js和vendor.js
NODE_ENV=production webpack
// 然后启动服务器
NODE_ENV=production nodemon server.js --exec babel-node
```

### dev
```javascript
DEBUG=wx NODE_ENV=start nodemon server.js --exec babel-node
```

## Tip
目前尝试过几次服务器渲染，但效果并不好，主要有这么几点：
1. 服务器渲染时候状态的传递，目前的做法是通过initstate进行传递；
2. 路由同步，对于登陆权限的路由处理问题还需要细细思量；
3. 服务器渲染是否那么必要，我做了一段时间还是对于我的需求来说没有那么重要；

当然服务器渲染我已经做了一大部分了，接下来可能需要对CSS Module加载进行进一步处理，需要用到`webpack-ismorphic-tools`有兴趣的可以进一步学习。
