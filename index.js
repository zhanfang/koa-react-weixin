var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-static');
var logger = require('koa-logger');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var xmlParser = require('koa-xml-body').default; // note the default
var mongo = require('koa-mongo');
var app = koa();
var Weixin = require('./weixin/weixin')('zhanfang');

//路由配置
router.post('/', Weixin.handler());
router.get('/home', Weixin.webIndex());
router.get('/login', Weixin.webLogin());

// 使用./public下的静态文件
app.use(serve(__dirname + '/public'));

app.keys = ['keys', 'keykeys'];
app.use(session({
  store: redisStore()
}));

app.use(logger());
app.use(mongo({
  db: 'weixin',
}));
app.use(xmlParser());
app.use(router.routes())
  .use(router.allowedMethods());

app.on('error', function(err) {
  console.log(err);
})
app.listen(3333);
