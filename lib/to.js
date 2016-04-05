var config = require('../config');

//将 js 组装成 xml
exports.toXml = function(data) {
  if (!data || !data.ToUserName || !data.FromUserName) {
    throw (new Error('data is wrong'));
  }
  var msgType = data.MsgType || 'text';
  var createTime = data.CreateTime || Date.now() / 1000;

  var msg = "" +
    "<xml>" +
    "<ToUserName><![CDATA[" + data.ToUserName + "]]></ToUserName>" +
    "<FromUserName><![CDATA[" + data.FromUserName + "]]></FromUserName>" +
    "<CreateTime>" + createTime + "</CreateTime>" +
    "<MsgType><![CDATA[" + msgType + "]]></MsgType>";

  switch (msgType) {
    case 'text':
      var content = data.Content || config.defaultMsg;
      msg += "" +
        "<Content><![CDATA[" + content + "]]></Content>" +
        "</xml>";
      return msg;

    case 'image':
      if (!data.MediaId) {
        throw (new Error('image is not exist'));
      }
      msg += "" +
        "<Image>" +
        "<MediaId><![CDATA[" + data.MediaId + "]]></MediaId>" +
        "</Image>" +
        "</xml>";
      return msg;

    case 'voice':
      if (!data.MediaId || !data.Title || !data.Description) {
        throw (new Error('voice is not exist'));
      }
      msg += "" +
        "<Voice>" +
        "<MediaId><![CDATA[" + data.MediaId + "]]></MediaId>" +
        "<Title><![CDATA[" + data.Title + "]]></Title>" +
        "<Description><![CDATA[" + data.Description + "]]></Description>" +
        "</Voice>" +
        "</xml>";
      return msg;

    case 'video':
      if (!data.MediaId) {
        throw (new Error('video is not exist'));
      }
      msg += "" +
        "<Video>" +
        "<MediaId><![CDATA[" + data.MediaId + "]]></MediaId>" +
        "</Video>" +
        "</xml>";
      return msg;

    case 'music':
      msg += "" +
        "<Music>" +
        "<Title><![CDATA[" + (data.Title || '') + "]]></Title>" +
        "<Description><![CDATA[" + (data.Description || '') + "]]></Description>" +
        "<MusicUrl><![CDATA[" + (data.MusicUrl || '') + "]]></MusicUrl>" +
        "<HQMusicUrl><![CDATA[" + (data.HQMusicUrl || data.MusicUrl || '') + "]]></HQMusicUrl>" +
        "<ThumbMediaId><![CDATA[" + (data.ThumbMediaId || '') + "]]></ThumbMediaId>" +
        "</Music>" +
        "</xml>";
      return msg;

    case 'news':
      var ArticlesStr = "";
      var ArticleCount = data.Articles.length;
      for (var i in data.Articles) {
        ArticlesStr += "" +
          "<item>" +
          "<Title><![CDATA[" + (data.Articles[i].Title || '') + "]]></Title>" +
          "<Description><![CDATA[" + (data.Articles[i].Description || '') + "]]></Description>" +
          "<PicUrl><![CDATA[" + (data.Articles[i].PicUrl || '') + "]]></PicUrl>" +
          "<Url><![CDATA[" + (data.Articles[i].Url || '') + "]]></Url>" +
          "</item>";
      }

      msg += "<ArticleCount>" + ArticleCount + "</ArticleCount><Articles>" + ArticlesStr + "</Articles></xml>";
      return msg;
    default:
      break;
  }
}

var eventMsg = function(data, msg) {
  msg.Event = data.Event[0];
  switch (msg.Event) {
    case 'subscribe':
      return msg;
      break;
    case 'CLICK':
      msg.EventKey = data.EventKey[0];
      return msg
      break;
    case 'VIEW':
      msg.EventKey = data.EventKey[0];
      return msg;
      break;
    default:
  }
}

exports.toJs = function(data) {
  var msg = {};
  msg.ToUserName = data.ToUserName[0];
  msg.FromUserName = data.FromUserName[0];
  msg.CreateTime = data.CreateTime[0];
  msg.MsgType = data.MsgType[0];
  switch (msg.MsgType) {
    case 'text':
      msg.Content = data.Content[0];
      msg.MsgId = data.MsgId[0];
      return msg;
    case 'image':
      msg.PicUrl = data.PicUrl[0];
      msg.MsgId = data.MsgId[0];
      msg.MediaId = data.MediaId[0];
      return msg;
    case 'voice':
      msg.MediaId = data.MediaId[0];
      msg.Format = data.Format[0];
      msg.MsgId = data.MsgId[0];
      return msg;
    case 'event':
      return eventMsg(data, msg);
    default:
      return msg;
  }
}
