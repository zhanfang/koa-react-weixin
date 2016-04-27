
'use strict';

/**
 * Module dependencies.
 */

const resolve = require('path').resolve;
const assert = require('assert');
const debug = require('debug')('koa-static');
const send = require('koa-send');

/**
 * Expose `serve()`.
 */

module.exports = serve;

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function serve(root, opts) {
  opts = opts || {};

  assert(root, 'root directory is required to serve files');

  // options
  debug('static "%s" %j', root, opts);
  opts.root = resolve(root);
  if (opts.index !== false)
    opts.index = opts.index || 'index.html';

  if (!opts.defer) {
    return function * serve(next) {
      if (this.method == 'HEAD' || this.method == 'GET') {
        //在默认情况下this.path = '/css/style.css' 会转变为本地.../public/css/style.css文件路径
        //由于做了反向代理this.path = '/weixin/css/style.css'
        //由于做了反向代理需要修改静态文件的path = '/css/style.css'
        var path
        if (opts.proxy) {
          path = this.path.replace(opts.proxy, '');
        } else {
          path = this.path;
        }

        if (yield send(this, path, opts)) return;
      }
      yield* next;
    };
  }


  return function * serve(next) {
    yield* next;

    if (this.method != 'HEAD' && this.method != 'GET') return;
    // response is already handled
    if (this.body != null || this.status != 404) return;

    yield send(this, this.path, opts);
  };
}
