/**同步 or 异步, 加载组件**/
const Async = {
  /**同步导入内容**/
  ReleaseFile: function(type, TEXT, name, version, isSameName, selected){
    if(type === 'js'){
      if(isSameName){ /**已经加载**/
        selected.text = TEXT;
        selected.setAttribute('version', version);
      }else{ /**未加载**/
        let js = document.createElement('script');
        js.setAttribute('name', name);
        js.setAttribute('version', version);
        js.type = 'text/javascript';
        js.text = TEXT;
        document.querySelector('body').appendChild(js);
      }
    }else{
      if(isSameName){
        selected.cssText = TEXT;
        selected.setAttribute('version', version);
      }else{
        let css = document.createElement('link');
        css.setAttribute('name', name);
        css.setAttribute('version', version);
        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.cssText = TEXT;
        document.querySelector('head').appendChild(css);
      }
    }
  },
  /**异步导入文件**/
  InsertURL: function(type, url, name, version, isSameName, selected){
    if(isSameName){
      selected.remove();
    }
    if(type === 'js'){
      let js = document.createElement('script');
      js.setAttribute('name', name);
      js.setAttribute('version', version);
      js.type = 'text/javascript';
      js.src = url;
      //script.async = "async";
      //script.defer = "defer";
      document.querySelector('body').appendChild(js);
    }else{
      let css = document.createElement('link');
      css.setAttribute('name', name);
      css.setAttribute('version', version);
      css.href = url;
      css.rel = 'stylesheet';
      css.type = 'text/css';
      document.querySelector('head').appendChild(css);
    }
  },
  /**ajax结果验证**/
  ajaxResult: function(type, res, name, version, isSameName, selected, url){
    if(res.readyState === 4){
      if(res.status === 200 || res.status === 304){
        Async.ReleaseFile(type, res.responseText, name, version, isSameName, selected);
      }else{
        alert( 'Request Error: '+url+', Error Msg: '+res.statusText+', Error Code: '+res.status);
      }
    }
  },
  /**同步ajax加载**/
  callAjax: function(type, url, name, version, isSameName, selected){
    if(window.jQuery){
      /** dateType后接受的参数
             1、"xml": 返回 XML 文档，可用 jQuery 处理。
             2、"html": 返回纯文本 HTML 信息；包含的 script 标签会在插入 dom 时执行。
             3、"script": 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了 "cache" 参数。注意：在远程请求时(不在同一个域下)，所有 POST 请求都将转为 GET 请求。（因为将使用 DOM 的 script标签来加载）
             4、"json": 返回 JSON 数据 。
             5、"jsonp": JSONP 格式。使用 JSONP 形式调用函数时，如 "myurl?callback=?" jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
             6、"text": 返回纯文本字符串
             7、"local":返回本地数据（即第一次初始化时只加载本地代码显示的样式，而不加载任何后台返回的数据）
             **/
      jQuery.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'text',
        success: function(result){
          Async.ReleaseFile(type, result, name, version, isSameName, selected);
        },
        error: function(result){
          Async.ajaxResult(type, result, name, version, isSameName, selected, url);
        },
      });
    }else{
      let xhr = new XMLHttpRequest() || new ActiveXObject('Msxml2.XMLHTTP') || new ActiveXObject('Microsoft.XMLHTTP');
      xhr.onreadystatechange = function(){
        Async.ajaxResult(type, xhr, name, version, isSameName, selected, url);
      };
      xhr.open('GET', url, false);
      xhr.send(null);
    }
  },
  /**组件初步判断**/
  Load: function(type, name, version, url, loadType, isCache){
    let isSameName = false, isSameVersion = false, Array = [], selected;
    if(type === 'js'){
      Array = document.querySelectorAll('script');
    }else if(type === 'css'){
      Array = document.querySelectorAll('link');
    }
    for(let i=0;i<Array.length;i++){
      if(Array[i].getAttribute('name') === name){
        isSameName = true;
        if(Array[i].getAttribute('version') === version) {
          isSameVersion = true;
        }
        selected = Array[i];
        break;
      }
    }
    if(isSameName && isSameVersion){
      return false;
    }
    if(isCache){
      url = url + '?t=' + new Date().valueOf();
    }
    if(loadType === 'link'){
      Async.InsertURL(type, url, name, version, isSameName, selected);
    }else if(loadType === 'release'){
      Async.callAjax(type, url, name, version, isSameName, selected);
    }
  },
};

export default Async;
