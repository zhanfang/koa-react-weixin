require('babel-register')({
  presets: ['es2015', 'react']
});
// require('babel-register');
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
//---------react服务器渲染及路由匹配----------
var React = require('react');
var ReactDOM = require('react-dom/server');
var ReactRouter = require('react-router');
var reactR = require('./app/routes');
var swig = require('swig');
//-----------------------------------------

var app = koa();
var r = require('./routes');
var router = new Router({
  prefix: '/weixin'
});

//路由配置
// router.post('/', xmlParser(), r.handler());
// router.get('/index', r.getIndex());
// router.get('/login', r.getLogin());
// router.post('/login', bodyParser(), r.postLogin());
// router.get('/keywords', r.getKs());
// router.post('/addK', bodyParser(), r.addK());
// router.get('/logout', r.logout());

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

app.use(function*(next) {
  var self = this;
  debug('self.path is %s', self.path);
  ReactRouter.match({
    routes: reactR.default,
    location: self.path
  }, function(err, redirectLocation, renderProps) {
    debug('redirectLocation is %s', redirectLocation);
    debug('err is %s', err);
    if (err) {
      self.status = 500;
    } else if (redirectLocation) {
      self.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // var html = ReactDOM.renderToString(React.createElement(ReactRouter.RouterContext, renderProps));
      // debug('html page is %s', html);
      // var page = swig.renderFile('views/index.html', {
      //   html: html
      // });
      self.body = swig.renderFile('views/index.html');
    } else {
      self.status = 404;
    }
  });
  yield next;
});


app.use(router.routes())
  .use(router.allowedMethods());

app.on('error', function(err, ctx) {
  console.error('server error', err);
  logger.err(err, ctx);
});
app.use(compress());
app.listen(3333);
