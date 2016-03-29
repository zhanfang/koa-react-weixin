var koa = require('koa');
var logger = require('koa-logger');
var xmlParser = require('koa-xml-body').default; // note the default
var mongo = require('koa-mongo');
var app = koa();

app.use(logger());

app.use(xmlParser());
app.use(mongo({
  db:'lab',
}));
app.use(function*(next) {
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
      console.log(msg);
      break;
    case 'image':
      msg.Content = data.Content[0];
      msg.MsgId = data.MsgId[0];
      console.log(msg);
      break;
    case 'voice':
      msg.Content = data.Content[0];
      msg.MsgId = data.MsgId[0];
      console.log(msg);
      break;
    case 'event':
      msg.Content = data.Content[0];
      msg.MsgId = data.MsgId[0];
      console.log(msg);
      break;
    default:
  }
  yield next;
});

app.use(function*(){
  this.body = this.mongo.db('lab').collection('users').findOne();
});

//app.use(function*() {
//  this.body = '<xml><ToUserName><![CDATA[oB00duIh1UoR9KtBRiKfh-GMOmYQ]]></ToUserName><FromUserName><![CDATA[gh_28617bcf9338]]></FromUserName><CreateTime>1459230117.465</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[这是文本回复]]></Content></xml>';
//})
app.on('error',function(err){
  console.log(err);
})
app.listen(3333);
