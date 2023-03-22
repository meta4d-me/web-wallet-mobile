import Obj2String from './Obj2String';

const unityBridge = {
  cb: null,
  // eslint-disable-next-line no-unused-vars
  call: function(method, args, cb){
    this.cb = cb || undefined;
    if(this.cb){
      args.callBack = 'needCallBack';
    }
    let url = 'uniwebview://'+method;
    /**调用app内native方法**/
    if(method === 'getNative'){
      url += Obj2String(args);
      /**调用原生关闭窗口，call('getNative', { type: 'closeH5' })**/
      if(args?.type === 'closeH5'){
        //window.location.href = 'uniwebview://getNative?type=closeH5';
        window.location.href = url;
      }
      /**调用原生返回**/
      if(args?.type === 'goBack'){
        //window.location.href = 'uniwebview://getNative?type=goBack';
        window.location.href = url;
      }
      /**调用原生保存图片功能，call('getNative', { type: 'saveImg', params:{type:'base64/http', url:'xxxxx', w:图片宽度，h:图片高度，name:'xxxx'} }， R=>{ 回调方法 })**/
      if(args?.type === 'saveImg'){
        //window.location.href = 'uniwebview://getNative?type=saveImg';
      }
      /**屏幕快照**/
      if(args?.type === 'screenShot'){
        //window.location.href = 'uniwebview://getNative?type=screenShot&callBack='+args.callBack;
        window.location.href = url;
      }
      /**调用原生旋转屏幕**/
      if(args?.type === 'orientation'){
        //window.location.href = 'uniwebview://getNative?type=orientation&callBack='+args.callBack;
        window.location.href = url;
      }
    }
    /**获取用户信息**/
    if(method === 'getUserInfo'){
      /**路由拦截，获取用户登录信息，call('getUserInfo', { type: 'loginInfo' }， R=>{ 回调方法 })， R = { success: true, data: { email: '', token: ''}}**/
      if(args?.type === 'loginInfo'){
        console.log('getUserInfo.loginInfo', JSON.stringify(args));
        window.location.href = url + '?type=loginInfo&callBack='+args.callBack;
      }
    }
    /**通知app设置用户信息**/
    if(method === 'setUserInfo'){
      url += Obj2String({ type: args.type, ...args.params, callBack: args.callBack });
      /**回传用户登录信息给app, call('setUserInfo', { type: 'loginInfo', params: { email: '', token: '' } }, (R)=>{  回调方法 })，R = { success: true, data: null }**/
      if(args?.type === 'loginInfo'){
        console.log('setUserInfo.loginInfo', JSON.stringify(args));
        //window.location.href = 'uniwebview://setUserInfo'+this.Obj2String({ type: args.type, ...args.params, callBack: args.callBack });
        window.location.href = url;
      }
      /**返给APP端用户tg绑定数据，call('setUserInfo', { type: 'tg', params: { bindStatus:true } }, (R)=>{  回调方法 })，R = { success: true, data: null}**/
      if(args?.type === 'tg'){
        console.log('setUserInfo.tg', JSON.stringify(args));
        //window.location.href = 'uniwebview://setUserInfo'+this.Obj2String({ type: args.type, ...args.params, callBack: args.callBack });
        window.location.href = url;
      }
      /**返给APP端用户discord绑定数据，call('setUserInfo', { type: 'discord', params: { bindStatus:true } }, (R)=>{  回调方法 })，R = { success: true, data: null}**/
      if(args?.type === 'discord'){
        console.log('setUserInfo.discord', JSON.stringify(args));
        //window.location.href = 'uniwebview://setUserInfo'+this.Obj2String({ type: args.type, ...args.params, callBack: args.callBack });
        window.location.href = url;
      }
    }
  },
  needCallBack: function(obj){
    console.log(obj);
    return this.cb(obj);
  },
};

export default unityBridge;
