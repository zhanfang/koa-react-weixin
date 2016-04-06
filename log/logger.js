var path = require('path'),
  winston = require('winston');

var date = new Date();
var now = '' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_';

var log = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'info-file',
      filename: path.join(__dirname, now + 'wx_msg_log.log'),
      level: 'info',
      timestamp: function() {
        return new Date().toString();
      }
    })
  ]
});

var err = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'error-file',
      filename: path.join(__dirname, now + 'error.log'),
      level: 'error',
      timestamp: function() {
        return new Date().toString();
      }
    })
  ]
});

module.exports = {
  log: log.info,
  err: err.error
}
