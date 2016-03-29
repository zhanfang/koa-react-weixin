var render = require('../lib/render');
var to = require('../lib/to');

var Weixin = function(token) {
  if (!(this instanceof Weixin)) {
    return new Weixin(token);
  }
  this.token = token;
  this.res = null;
}

//将 js 组装成 xml
Weixin.prototype.toXML = function(data) {
  return to.toXml(data);
};

/*
* 1.存储到数据库
* 2.查询数据库
* 3.返回
*/
Weixin.prototype.handler = function() {
  //此处this==Weixin
  var self = this;
  return function*(next) {
    //此处this=app.context
    var data = this.request.body.xml;
    var msg = {};
    msg.ToUserName = data.ToUserName[0];
    msg.FromUserName = data.FromUserName[0];
    msg.CreateTime = data.CreateTime[0];
    msg.MsgType = data.MsgType[0];
    switch (msg.MsgType) {
      case 'text':
        msg.Content = data.Content[0];
        msg.MsgId = data.MsgId[0];
        yield this.mongo.db('weixin').collection('logtext').insert(msg);
        var val = yield this.mongo.db('weixin').collection('keywords').findOne({
          'key': msg.Content
        }, {
          _id: 0,
          key: 0
        });
        var reMsg = {
          FromUserName: msg.ToUserName,
          ToUserName: msg.FromUserName,
          Content: val.val,
          CreateTime: Date.now() / 1000
        };
        yield this.mongo.db('weixin').collection('logtext').insert(reMsg);
        var data = to.toXml(reMsg);
        console.log(data);
        this.body = data;
        // yield self.handlerText(msg);
        break;
      case 'image':
        msg.PicUrl = data.PicUrl[0];
        msg.MsgId = data.MsgId[0];
        msg.MediaId = data.MediaId[0];
        console.log(msg);
        break;
      case 'voice':
        msg.MediaId = data.MediaId[0];
        msg.Format = data.Format[0];
        msg.MsgId = data.MsgId[0];
        console.log(msg);
        break;
      case 'event':
        msg.Event = data.Event[0];
        msg.EventKey = data.EventKey[0];
        console.log(msg);
        break;
      default:
    }
    yield next;
  }
};


Weixin.prototype.webIndex = function() {
  return function*(next) {
    if (this.session.user) {
    } else {
      this.redirect('/login');
    }
    yield next;
  }
};

Weixin.prototype.webLogin = function() {
  return function*(next) {
    this.body = yield render('login');
    yield next;
  }
};

module.exports = Weixin;
