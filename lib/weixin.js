var config = require('../config');
var to = require('../lib/to');

exports.text = function(msg) {
  return function*() {
    var val = yield this.mongo.db('weixin').collection('keywords').findOne({
      'key': msg.Content
    }, {
      _id: 0,
      key: 0
    });
    var reMsg = {
      FromUserName: msg.ToUserName,
      ToUserName: msg.FromUserName,
      Content: val ? val.val : config.defaultMsg,
      MsgType: 'text',
      CreateTime: msg.CreateTime
    };
    yield this.mongo.db('weixin').collection('log_ret').insert(reMsg);
    this.body = to.toXml(reMsg);
  }
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
    yield this.mongo.db('weixin').collection('log_ret').insert(reMsg);
    this.body = to.toXml(reMsg);
  }
};
