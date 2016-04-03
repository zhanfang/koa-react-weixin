'use strict';
var should = require('should');
var to = require('../lib/to');

var createTime = Date.now() / 1000;


describe('to', function() {
  describe('tojs', function() {
    it('data is text msg', function() {
      const data = {
        ToUserName: ['toUser'],
        FromUserName: ['fromUser'],
        CreateTime: ['1348831860'],
        MsgType: ['text'],
        Content: ['123'],
        MsgId: ['123']
      };
      const msg = {
        ToUserName: 'toUser',
        FromUserName: 'fromUser',
        CreateTime: '1348831860',
        MsgType: 'text',
        Content: '123',
        MsgId: '123'
      };
      to.toJs(data).should.eql(msg);
    });
  });

  describe('toxml', function() {
    it('when content is null', function() {
      let data = {
        FromUserName: 'zhanfang',
        ToUserName: 'weixin',
        MsgType: 'text',
        CreateTime: createTime
      };
      let xmlData = "" +
        "<xml>" +
        "<ToUserName><![CDATA[weixin]]></ToUserName>" +
        "<FromUserName><![CDATA[zhanfang]]></FromUserName>" +
        "<CreateTime>" + createTime + "</CreateTime>";
      xmlData += "<MsgType><![CDATA[text]]></MsgType><Content><![CDATA[这是默认回复]]></Content></xml>";
      to.toXml(data).should.eql(xmlData);
      xmlData = '';
    });

    it('when MsgType is text', function() {
      let data = {
        FromUserName: 'zhanfang',
        ToUserName: 'weixin',
        MsgType: 'text',
        CreateTime: createTime,
        Content: '你好，xml'
      };
      let xmlData = "" +
        "<xml>" +
        "<ToUserName><![CDATA[weixin]]></ToUserName>" +
        "<FromUserName><![CDATA[zhanfang]]></FromUserName>" +
        "<CreateTime>" + createTime + "</CreateTime>";
      xmlData += "<MsgType><![CDATA[text]]></MsgType><Content><![CDATA[你好，xml]]></Content></xml>";
      to.toXml(data).should.eql(xmlData);
    });
  });

  describe('toxml with invaild data', function() {
    it('when data is undefined', function() {
      let data = undefined;
      try {
        to.toXml(data);
      } catch (e) {
        e.message.should.eql('data is wrong');
      }
    });
    it('when data.FromUserName is undefined', function() {
      let data = {
        ToUserName: 'weixin',
        MsgType: 'text',
        CreateTime: createTime
      };
      try {
        to.toXml(data);
      } catch (e) {
        e.message.should.eql('data is wrong');
      }
    });
    it('when data.ToUserName is undefined', function() {
      let data = {
        FromUserName: 'zhanfang',
        MsgType: 'text',
        CreateTime: createTime
      };
      try {
        to.toXml(data);
      } catch (e) {
        e.message.should.eql('data is wrong');
      }
    });
    it('when data.MediaId is undefined', function() {
      let data = {
        FromUserName: 'zhanfang',
        ToUserName: 'weixin',
        MsgType: 'image',
        CreateTime: createTime
      };
      try {
        to.toXml(data);
      } catch (e) {
        e.message.should.eql('image is not exist');
      }
    });
  });
});
