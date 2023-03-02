var bridge = {
  default: this,// for typescript
  call: function (method, args, cb) {
    let ret = '';
    if (typeof args == 'function') {
      cb = args;
      args = {};
    }
    let arg = { data: args === undefined ? null : args };
    if (typeof cb == 'function') {
      let cbName = 'dscb' + window.dscb++;
      window[cbName] = cb;
      arg['_dscbstub'] = cbName;
    }
    arg = JSON.stringify(arg);

    //if in webview that dsBridge provided, call!
    if (window._dsbridge) {
      ret = _dsbridge.call(method, arg);
    } else if (window._dswk || navigator.userAgent.indexOf('_dsbridge') !== -1) {
      ret = prompt('_dsbridge=' + method, arg);
    }

    return JSON.parse(ret || '{}').data;
  },
  register: function (name, fun, asyn) {
    let q = asyn ? window._dsaf : window._dsf;
    if (!window._dsInit) {
      window._dsInit = true;
      //notify native that js apis register successfully on next event loop
      setTimeout(function () {
        bridge.call('_dsb.dsinit');
      }, 0)
    }
    if (typeof fun == 'object') {
      q._obs[name] = fun;
    } else {
      q[name] = fun;
    }
  },
  registerAsyn: function (name, fun) {
    this.register(name, fun, true);
  },
  hasNativeMethod: function (name, type) {
    return this.call('_dsb.hasNativeMethod', { name: name, type: type || 'all' });
  },
  disableJavascriptDialogBlock: function (disable) {
    this.call('_dsb.disableJavascriptDialogBlock', {
      disable: disable !== false,
    })
  },
};

!function () {
  if (window._dsf) {
    return;
  }
  let _close = window.close;
  let ob = {
    //保存JS同步方法
    _dsf: {
      _obs: {},
    },
    //保存JS异步方法
    _dsaf: {
      _obs: {},
    },
    dscb: 0,
    dsBridge: bridge,
    close: function () {
      if (bridge.hasNativeMethod('_dsb.closePage')) {
        bridge.call('_dsb.closePage');
      } else {
        _close.call(window);
      }
    },
    _handleMessageFromNative: function (info) {
      let arg = JSON.parse(info.data);
      let ret = {
        id: info.callbackId,
        complete: true,
      }
      let f = this._dsf[info.method];
      let af = this._dsaf[info.method];
      let callSyn = function (f, ob) {
        ret.data = f.apply(ob, arg);
        bridge.call('_dsb.returnValue', ret);
      };
      let callAsyn = function (f, ob) {
        arg.push(function (data, complete) {
          ret.data = data;
          ret.complete = complete !== false;
          bridge.call('_dsb.returnValue', ret)
        });
        f.apply(ob, arg);
      };
      if (f) {
        callSyn(f, this._dsf);
      } else if (af) {
        callAsyn(af, this._dsaf);
      } else {
        //with namespace
        let name = info.method.split('.');
        if (name.length < 2) {
          return;
        }
        let method = name.pop();
        let namespace = name.join('.');
        let obs = this._dsf._obs;
        let ob = obs[namespace] || {};
        let m = ob[method];
        if (m && typeof m == 'function') {
          callSyn(m, ob);
          return;
        }
        obs = this._dsaf._obs;
        ob = obs[namespace] || {};
        m = ob[method];
        if (m && typeof m == 'function') {
          callAsyn(m, ob);
          return;
        }
      }
    },
  };
  for (let attr in ob) {
    window[attr] = ob[attr];
  }
  bridge.register('_hasJavascriptMethod', function (method, tag) {
    let name = method.split('.');
    if (name.length < 2) {
      return !!(_dsf[name] || _dsaf[name])
    } else {
      // with namespace
      var method = name.pop();
      let namespace = name.join('.');
      let ob = _dsf._obs[namespace] || _dsaf._obs[namespace];
      return ob && !!ob[method];
    }
  })
}();

export default
