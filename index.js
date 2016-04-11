var logger = require('./log/logger');
var debug = require('debug')('wx');
var koa = require('koa');
var Router = require('koa-router');
var serve = require('koa-static');
var logger = require('koa-logger');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var bodyParser = require('koa-bodyparser');
var xmlParser = require('koa-xml-body').default; // note the default
var mongo = require('koa-mongo');
var compress = require("koa-compress");

var app = koa();
var r = require('./routes');
var router = new Router({
  prefix: '/weixin'
});

//路由配置
router.post('/', xmlParser(), r.handler());
router.get('/index', r.getIndex());
router.get('/login', r.getLogin());
router.post('/login', bodyParser(), r.postLogin());
router.get('/keywords', r.getKs());
router.post('/addK', bodyParser(), r.addK());
router.get('/logout', r.logout());

app.keys = ['wx', 'zf'];
app.use(session({
  key: 'wx.sid',
  store: redisStore(),
  cookie: {
    httpOnly: true,
    path: '/',
    overwrite: true,
    signed: true,
    maxAge: null //one hour in ms
  }
}));

// 使用./public下的静态文件
app.use(serve(__dirname + '/public', {
  proxy: '/weixin'
}));

app.use(logger());
app.use(mongo({
  db: 'weixin',
}));


app.use(router.routes())
  .use(router.allowedMethods());

app.on('error', function(err, ctx) {
  console.error('server error', err);
  logger.err(err, ctx);
});
app.use(compress());
app.listen(3333);
