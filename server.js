import koa from 'koa';
import Router from 'koa-router';
import serve from './lib/koa-static';
import logger from 'koa-logger';
import session from 'koa-generic-session';
import redisStore from 'koa-redis';
import bodyParser from 'koa-bodyparser';
import xmlParser from 'koa-xml-body'; // note the default
import mongo from 'koa-mongo';
import compress from "koa-compress";

var debug = require('debug')('wx');

//服务器渲染
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import reactR from './app/routes';
import rootReducer from './app/reducers';
import swig from 'swig';

// webpack热加载
import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import config from './webpack.config';

const app = koa();
const env = process.env.NODE_ENV;
const router = new Router({
  prefix: '/weixin'
});

//路由配置
var r = require('./routes');
router.post('/', xmlParser(), r.handler());
// router.get('/index', r.getIndex());
// router.get('/login', r.getLogin());
router.post('/login', bodyParser(), r.postLogin());
router.get('/keywords', r.getKs());
router.post('/addkey', bodyParser(), r.addkey());
router.post('/delkey', bodyParser(), r.delkey());
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

//服务器渲染
app.use(function*(next) {
  const self = this;
  match({
    routes: reactR,
    location: self.path
  }, function(err, redirectLocation, renderProps) {
    debug('redirectLocation is %s', redirectLocation);
    debug('err is %s', err);
    debug('renderProps is %s', renderProps);
    if (err) {
      self.status = 500;
    } else if (redirectLocation) {
      self.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = compose(
        applyMiddleware.apply(this, [thunk, apiMiddleware])
      )(createStore)(rootReducer);

      // render the component to string
      const initialView = renderToString(
        <Provider store={store}>
            { <RouterContext {...renderProps} /> }
        </Provider>
      );
      const initialState = store.getState();
      if (env === 'production') {
        self.body = swig.renderFile('views/index.html', {
          html: initialView,
          initialState
        });
      } else {
        self.body = swig.renderFile('views/index_dev.html', {
          html: initialView,
          initialState
        });
      }
    } else {
      self.status = 404;
    }
  });
  yield next;

});


app.on('error', function(err, ctx) {
  console.error('server error', err);
});
app.use(compress());

if (env !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}



app.listen(3333);
