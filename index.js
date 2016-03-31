var koa = require('koa');
var Router = require('koa-router');
var serve = require('koa-static');
var logger = require('koa-logger');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var bodyParser = require('koa-bodyparser');
var xmlParser = require('koa-xml-body').default; // note the default
var mongo = require('koa-mongo');
var app = koa();
var Weixin = require('./weixin/weixin')('zhanfang');
var router = new Router({
  prefix: '/weixin'
});

//路由配置
router.post('/', xmlParser(), Weixin.handler());
router.get('/index', Weixin.webIndex());
router.get('/login', Weixin.webLoginGet());
router.post('/login', bodyParser(), Weixin.webLoginPost());
router.get('/keywords', Weixin.webKeywordsGet());
router.post('/addK', bodyParser(), Weixin.webKeywordsAdd());
router.get('/logout', Weixin.webLogout());
router.get('/test', Weixin.test());

// 使用./public下的静态文件
app.use(serve(__dirname + '/public', {
  proxy: '/weixin'
}));

app.keys = ['keys', 'keykeys'];
app.use(session({
  store: redisStore(),
  cookie: {
    httpOnly: true,
    path: '/',
    overwrite: true,
    signed: true,
    maxAge: null //one hour in ms
  }
}));

app.use(logger());
app.use(mongo({
  db: 'weixin',
}));
// app.use(xmlParser());
app.use(router.routes())
  .use(router.allowedMethods());

app.on('error', function(err, ctx) {
  console.error('server error', err, ctx);
});

app.listen(3333);
