/**
* 自定义alert方法
*/
(function(window) {
  'use strict';
  var doc,
    mask,
    box,
    init,
    maskCreate,
    alertCreate,
    remove;

  doc = window.document;

  /**
    创建遮罩层
  */
  maskCreate = function() {
    var singleMask = function() {
      if (!mask) {
        mask = doc.createElement('div');
        mask.id = 'mask';
        mask.style.cssText = 'position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 10;opacity: 0.4;background: rgba(0, 0, 0, 1);';
        mask.onclick = function() {
          remove();
        };
      }

    }();
    doc.body.appendChild(mask);
  }

  /**
    创建弹出对话框的函数
  */
  alertCreate = function(content) {
    var singleBox = function() {
      if (!box) {
        box = doc.createElement('div');
        box.id = 'zfAlert';
        box.className = 'msg';
        box.style.cssText = 'position: fixed;left: 50%;top: 50%;transform: translate3d(-50%,-50%,0);margin-top: -100px;opacity: 0;transition: all 0.5s ease;z-index:11;';
        box.innerHTML = content;
      }
    }();
    doc.body.appendChild(box);
  }

  /**
     清除遮罩层以及弹出的对话框
  */
  remove = function() {
    var mask = doc.getElementById('mask');
    var zfAlert = doc.getElementById('zfAlert');
    if (null == mask && null == zfAlert) return;
    setTimeout(function() {
      doc.body.removeChild(mask);
      doc.body.removeChild(zfAlert);
    }, 500);
    doc.getElementById('zfAlert').style.marginTop = "-200px";
    doc.getElementById('zfAlert').style.opacity = "0";
  }

  init = function msgbox(content, func, height, width) {
    var close,
      submit;
    //创建遮窗
    maskCreate();
    alertCreate(content);

    close = doc.getElementById('close');
    submit = doc.getElementById('submit');

    close.addEventListener('click', remove, false);
    submit.addEventListener('click', func, false);

    setTimeout(function() {
      doc.getElementById('zfAlert').style.marginTop = "0";
      doc.getElementById('zfAlert').style.opacity = "1";
    }, 100);

  };

  window.zfAlert = init;

})(window);
