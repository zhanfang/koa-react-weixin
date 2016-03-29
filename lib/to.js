var xml2js = require('xml2js');

exports.toJs = function(xml) {
  return new Promise(function(resolve, reject) {
    xml2js.parseString(xml, function(err, data) {
      if (err) reject(new Error(err));
      resolve(data.xml);
    })
  });
};

//将 js 组装成 xml
exports.toXml = function(data) {
  //自动检测 MsgType
  var MsgType = "";
  if (!data.MsgType) {
    if (data.hasOwnProperty("Content"))
      MsgType = "text";
    if (data.hasOwnProperty("MusicUrl"))
      MsgType = "music";
    if (data.hasOwnProperty("Articles"))
      MsgType = "news";
  } else {
    MsgType = data.MsgType;
  }

  var msg = "" +
    "<xml>" +
    "<ToUserName><![CDATA[" + data.ToUserName + "]]></ToUserName>" +
    "<FromUserName><![CDATA[" + data.FromUserName + "]]></FromUserName>" +
    "<CreateTime>" + data.CreateTime + "</CreateTime>" +
    "<MsgType><![CDATA[" + MsgType + "]]></MsgType>";

  switch (MsgType) {
    case 'text':
      msg += "" +
        "<Content><![CDATA[" + (data.Content || '') + "]]></Content>" +
        "</xml>";
      return msg;

    case 'image':
      msg += "" +
        "<Image>" +
        "<MediaId><![CDATA[" + data.MediaId + "]]></MediaId>" +
        "</Image>" +
        "</xml>";
      return msg;

    case 'voice':
      msg += "" +
        "<Voice>" +
        "<MediaId><![CDATA[" + data.MediaId + "]]></MediaId>" +
        "<Title><![CDATA[" + data.Title + "]]></Title>" +
        "<Description><![CDATA[" + data.Description + "]]></Description>" +
        "</Voice>" +
        "</xml>";
      return msg;

    case 'video':
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
