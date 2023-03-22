/**获取URL的obj参数**/
const getURLParam = function (parameter, String) {
  let url = decodeURIComponent(String).replace(/\r\n/g,'').replace(/\n/g,'').replace(/\s+/g,''), NewObj = {}, t, t1, t2, t3;
  t1 = url.indexOf('?');
  t2 = url.indexOf('#/');
  /**t2 > t1说明路由中间有参数，t1 > t2为正常url参数**/
  if(t2 > t1){
    let s = url.slice(t1+1, t2);
    url = url.slice(t2);
    t3 = url.indexOf('?');
    if(t3 > -1){
      s += '&'+url.slice(t3+1);
    }
    url = s;
  }else{
    url = url.slice(t1+1);
  }
  url = url.split('&');
  for(let i=0;i<url.length;i++){
    if(url[i].length > 0 && url[i].indexOf('=') > 0){
      t = url[i].indexOf('=');
      NewObj[url[i].slice(0,t)] = url[i].slice(t+1);
    }
  }
  if(typeof parameter === 'string'){
    for(let x in NewObj){
      if(x === parameter){
        return NewObj[x];
      }
    }
  }else if(parameter instanceof Object){
    return NewObj;
  }
};

export default getURLParam;
