var config = require('../config');
var redis = require('koa-redis')().client;

exports.text = function(msg) {
  return function*() {
    var val = yield redis.get(msg.Content);
    if (!val) {
      val = yield this.mongo.db('weixin').collection('keywords').findOne({
        'key': msg.Content
      }, {
        _id: 0,
        key: 0
      });
      if (val) {
        yield redis.set(msg.Content, JSON.stringify(val));
      }
    } else {
      val = JSON.parse(val);
    }

    var reMsg = {
      FromUserName: msg.ToUserName,
      ToUserName: msg.FromUserName,
      Content: val ? val.val : config.defaultMsg,
      MsgType: 'text',
      CreateTime: msg.CreateTime
    };
    return reMsg;
  }
}

exports.subscribe = function(msg) {
  return function*() {}
}

exports.default = function(msg) {
  return function*() {
    var reMsg = {
      FromUserName: msg.ToUserName,
      ToUserName: msg.FromUserName,
      Content: config.defaultMsg,
      MsgType: 'text',
      CreateTime: msg.CreateTime
    };
    return reMsg;
  }
};
