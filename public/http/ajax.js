const qs = require('qs');
import { showFailToast } from 'vant';

const Err = (err, fn) => {
  showFailToast ('Network is busy, Please try again later ! ');
  err.msg = err.msg || err.message;
  fn(err);
};

const getHeader = (obj) => {
  let userInfo = sessionStorage.userInfo ? JSON.parse(sessionStorage.userInfo) : {};
  let token = userInfo.token || null;
  obj = obj || {};
  obj = { ...obj, ...{ token } };
  return obj;
};

const resNext= (R, resolve, obj) => {
  //debugger
  if(R.status === 200){
    location.reload();
  }else{
    showFailToast('Network is busy, Error code: '+R.status+' ! ');
    resolve(R.data);
  }
};

/**封装json静态文件请求**/
export const getStaticJSON = (url) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    axios({
      method: 'get',
      url: url,
      dataType: 'json',
      cache: false,
    }).then(res => {
      resolve(res);
    }).catch(err => {
      return Err(err, reject);
    })
  });
};


export const formPost = (url, params) => {
  return new Promise((resolve, reject) => {
    let headers = getHeader();
    if(params && params.header){
      headers = Object.assign(headers, params.header);
      delete params.header;
    }
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // eslint-disable-next-line no-undef
    axios({
      method: 'POST',
      url: url,
      data: qs.stringify(params),
      headers: headers,
    }).then(res => {
      if (res.data) {
        resolve(res.data);
      } else {
        return resNext(res, resolve, { url, params });
      }
    }).catch(err => {
      return Err(err, reject);
    })
  })
};


export const getApi = (url, params) => {
  return new Promise((resolve, reject) => {
    let headers = getHeader(), obj = { method: 'GET' };
    if(params && params.header){
      headers = Object.assign(headers, params.header);
      if(headers.responseType){
        obj.responseType = headers.responseType;
        delete headers.responseType;
      }
      delete params.header;
    }
    obj.url = url;
    obj.headers = headers;
    obj.params = params;
    // eslint-disable-next-line no-undef
    axios(obj).then(res => {
      if (res.data) {
        resolve(res.data);
      } else {
        return resNext(res, resolve, { url, params });
      }
    }).catch(err => {
      return Err(err, reject);

    })
  })
};

export const postApi = (url, params) => {
  return new Promise((resolve, reject) => {
    let headers = getHeader();
    if(params && params.header){
      headers = Object.assign(headers, params.header);
      delete params.header;
    }
    // eslint-disable-next-line no-undef
    axios({
      method: 'POST',
      url: url,
      data: params,
      headers: headers,
    }).then(res => {
      if (res.data) {
        resolve(res.data);
      } else {
        return resNext(res, resolve, { url, params });
      }
    }).catch(err => {
      return Err(err, reject);
    })
  })
};

