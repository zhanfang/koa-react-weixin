'use strict';
var should = require('should');
var request = require('supertest');
// var muk = require('muk');
var Router = require('koa-router');
var r = require('../routes');
var koa = require('koa');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var bodyParser = require('koa-bodyparser');
var xmlParser = require('koa-xml-body').default; // note the default
var mongo = require('koa-mongo');
var router = new Router({
  prefix: '/weixin'
});

describe('routes', function() {
  describe('/', function() {
    it('text', function(done) {
      const recv = "<xml><ToUserName><![CDATA[toUser]]></ToUserName><FromUserName><![CDATA[fromUser]]></FromUserName><CreateTime>1348831860</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[this is a test]]></Content><MsgId>1234567890123456</MsgId></xml>";
      const ret = "<xml><ToUserName><![CDATA[fromUser]]></ToUserName><FromUserName><![CDATA[toUser]]></FromUserName><CreateTime>1348831860</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[这是默认回复]]></Content></xml>";
      let app = koa();
      router.post('/', xmlParser(), r.handler());
      app.use(mongo({
        db: 'weixin',
      }));
      app.use(router.routes())
        .use(router.allowedMethods());

      app.use(function*() {
        this.body.should.match(ret);
      });
      request(app.listen())
        .post('/weixin/')
        .set('Content-Type', 'text/xml')
        .send(recv)
        .expect(200, done);
    });
  });

  describe('login', function() {
    it('method get without session', function(done) {
      let app = koa();
      router.get('/login', r.getLogin());
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
      app.use(router.routes())
        .use(router.allowedMethods());
      app.use(function*() {
        this.status.should.eql(200);
      });
      request(app.listen())
        .get('/weixin/login')
        .expect(200, done);
    });
    it('method get with session', function(done) {
      let app = koa();
      router.get('/login', r.getLogin());
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
      app.use(function*(next) {
        this.session.user = 'zhanfang';
        yield next;
      });
      app.use(router.routes())
        .use(router.allowedMethods());
      app.use(function*() {
        this.status.should.eql(302);
      });
      request(app.listen())
        .get('/weixin/login')
        .expect(302, done);
    });
    it('method post success', function(done) {
      let app = koa();
      router.post('/login', bodyParser(), r.postLogin());
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
      app.use(mongo({
        db: 'weixin',
      }));
      app.use(router.routes())
        .use(router.allowedMethods());
      app.use(function*() {
        this.session.user.username.should.eql('zhanfang');
        this.status.should.eql(302);
      });
      request(app.listen())
        .post('/weixin/login')
        .type('form')
        .send({
          username: 'zhanfang',
          password: 'zhanfang123'
        })
        .expect(302, done);
    });
    it('method post user wrong', function(done) {
      let app = koa();
      router.post('/login', bodyParser(), r.postLogin());
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
      app.use(mongo({
        db: 'weixin',
      }));
      app.use(router.routes())
        .use(router.allowedMethods());
      app.use(function*() {
        should.not.exist(this.session.user);
      });
      request(app.listen())
        .post('/weixin/login')
        .type('form')
        .send({
          username: 'zhan',
          password: ''
        })
        .expect(200, done);
    });
  });

  describe('index', function() {
    it('with session', function(done) {
      let app = koa();
      router.get('/index', r.getIndex());
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
      app.use(function*(next) {
        this.session.user = 'zhanfang';
        yield next;
      });
      app.use(router.routes())
        .use(router.allowedMethods());
      app.use(function*() {
        this.status.should.eql(200);
      });
      request(app.listen())
        .get('/weixin/index')
        .expect(200, done);
    });
    it('without session', function(done) {
      let app = koa();
      router.get('/login', r.getIndex());
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
      app.use(router.routes())
        .use(router.allowedMethods());
      app.use(function*() {
        should.not.exist(this.session.user);
      });
      request(app.listen())
        .get('/weixin/index')
        .expect(302, done);
    });
  });

  describe('keywords', function() {
    describe('getKs', function() {
      it('with session', function(done) {
        let app = koa();
        router.get('/getKs', r.getKs());
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
        app.use(mongo({
          db: 'weixin',
        }));
        app.use(function*(next) {
          this.session.user = 'zhanfang';
          yield next;
        });
        app.use(router.routes())
          .use(router.allowedMethods());
        app.use(function*() {
          this.status.should.eql(200);
        });
        request(app.listen())
          .get('/weixin/getKs')
          .expect(200, done);
      });
      it('without session', function(done) {
        let app = koa();
        router.get('/getKs', r.getKs());
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
        app.use(mongo({
          db: 'weixin',
        }));
        app.use(router.routes())
          .use(router.allowedMethods());
        app.use(function*() {
          should.not.exist(this.session.user);
          this.status.should.eql(302);
        });
        request(app.listen())
          .get('/weixin/getKs')
          .expect(302, done);
      });
    });
    describe('addk', function() {
      it('with session', function(done) {
        let data = {
          key: 'z',
          val: 'f'
        };
        let app = koa();
        router.post('/addK', bodyParser(), r.addK());
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
        app.use(mongo({
          db: 'weixin',
        }));
        app.use(function*(next) {
          this.session.user = 'zhanfang';
          yield next;
        });
        app.use(router.routes())
          .use(router.allowedMethods());
        app.use(function*() {
          this.body.should.eql({
            ok: 1,
            n: 1
          });
        });
        request(app.listen())
          .post('/weixin/addK')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(data))
          .expect(200, done);
      });
      it('without session', function(done) {
        let data = {
          key: 'z',
          val: 'f'
        };
        let app = koa();
        router.post('/addK', bodyParser(), r.addK());
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
        app.use(mongo({
          db: 'weixin',
        }));
        app.use(router.routes())
          .use(router.allowedMethods());
        app.use(function*() {
          should.not.exist(this.session.user);
          this.status.should.eql(302);
        });
        request(app.listen())
          .post('/weixin/addK')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(data))
          .expect(302, done);
      });
    });
  });

  describe('logout', function() {
    it('with session', function(done) {
      let app = koa();
      router.get('/logout', r.logout());
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
      app.use(function*(next) {
        this.session.user = 'zhanfang';
        yield next;
      });
      app.use(router.routes())
        .use(router.allowedMethods());
      app.use(function*() {
        should.not.exist(this.session);
        this.status.should.eql(302);
      });
      request(app.listen())
        .get('/weixin/logout')
        .expect(302, done);
    });
    it('without session', function(done) {
      // body...
      let app = koa();
      router.get('/logout', r.logout());
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
      app.use(router.routes())
        .use(router.allowedMethods());
      app.use(function*() {
        should.not.exist(this.session);
        this.status.should.eql(302);
      });
      request(app.listen())
        .get('/weixin/logout')
        .expect(302, done);
    });
  });
});
