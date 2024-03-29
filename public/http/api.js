import { getStaticJSON, postApi } from './ajax';
import $$ from '@App/$$';

/**获取环境的请求URL配置**/
const $API = {
  /**==========通用业务开始========================================================================================**/
  /**获取静态JSON文件**/
  getStaticJsonFiles: params => {
    return getStaticJSON($$.apiURLS.staticURL + 'static/json/' + params + '?t=' + new Date().valueOf());
  },
  /**postAPI - DEMO， url拼装参数
  postAPIDemo1: params => {
    return postApi(`${host}/xxxxx/xxxxx`, params);
  },**/
  /**postAPI - DEMO，body拼装参数
  postAPIDemo2: params => {
    return postApi(`${host}/xxxxxx/xxxxxxx`, params)
  },**/
  /**getApi - DEMO
  getApI: params => {
    return getApi(`${host}/xxxxxx/xxxxx`, params);
  },**/
  /**formpost - DEMO
  formPostDemo: params => {
    return formPost(`${host}/xxxxxx/xxxx`, params);
  },**/
  postAPIDemo2: params => {
    return postApi('/api/images'+$$.Obj2String(params))
  },
};

export default $API;
