/**获取用户设备信息**/
import getStringParam from './getStringParam';
const userPlatInfo = function(obj) {
  let NewObj = {
    appMode: 'browser', // app / browser / WX
    appVersion: process.env.appVersion, /**当前app版本**/
    appType: 'web', // app / game
    appName: '', // platform / gameName
    equipment: '', /**设备名称**/
    equipmentOS: '', /**设备系统**/
    osVersion: '', /**系统版本**/
    browser: '', /**浏览器**/
    browserVersion: '', /**浏览器版本**/
    env: '',
  };
  obj = obj ? Object.assign(NewObj, obj) : NewObj;
  let UA = navigator.userAgent.toLocaleLowerCase();
  // 第一步先判断设备类型，OS类型，OS版本
  if(UA.indexOf('macintosh') > -1){ // 判断苹果电脑
    obj.equipment = 'Macintosh';
    obj.equipmentOS = 'Mac OS X';
    let t = UA.indexOf('mac os x'), t1 = UA.indexOf(')');
    obj.osVersion = UA.slice(t+9,t1).replace('mac os x','').replace(/_/g, '.');
    if(obj.osVersion === ''){
      obj.osVersion = 'Mac OS X'
    }
    if(1024 >= document.documentElement.offsetWidth){
      obj.env = 'mobile';
    }else{
      obj.env = 'pc';
    }
    // eslint-disable-next-line brace-style
  }
  // 判断windows电脑
  else if(UA.indexOf('windows') > -1){
    obj.equipment = 'Windows';
    let PcList = [
      { name: '5.0',OS: '2000',version: '2000' },
      { name: '5.1',OS: 'XP',version: 'Sp1 / Sp2' },
      { name: '5.2',OS: 'XP / 2003',version: 'XP Sp3 / Server 2003' },
      { name: '6.0',OS: 'Vista / 2008',version: 'Vista / Server 2008' },
      { name: '6.1',OS: '7 / 2008',version: '7 / Server 2008 R2' },
      { name: '6.2',OS: '8 / 2012',version: '8 / Server 2012' },
      { name: '6.3',OS: '8.1 / 2012',version: '8.1 / Server 2012 R2' },
      { name: '6.4',OS: '10',version: '6.4' },
      { name: '10.0',OS: '10',version: '10.0' },
      { name: '11.0',OS: '11',version: '11.0' },
    ];
    for(let i=0;i<PcList.length;i++){
      let win = 'windows nt '+ PcList[i].name;
      if(UA.indexOf(win) > -1){
        obj.equipmentOS = 'Windows '+PcList[i].OS;
        obj.osVersion = 'Win'+PcList[i].version
      }
    }
    if(1024 >= document.documentElement.offsetWidth){
      obj.env = 'mobile';
    }else{
      obj.env = 'pc';
    }
    // eslint-disable-next-line brace-style
  }
  // 安卓设备
  else if(UA.indexOf('android') > -1 || UA.indexOf('linux') > -1){
    obj.equipment = 'Android';
    let MList = UA.split(';');
    for(let i=0;i<MList.length;i++){
      if(MList[i].indexOf('android') > -1){
        obj.equipmentOS = 'Android'+ MList[i].slice(MList[i].indexOf('android'),MList[i].length).replace('android','').replace(/\*|\_|\?/g,'.').replace(/\-|\+|\?/g,' ')
      }
      if(MList[i].indexOf('build') > -1){
        obj.osVersion = MList[i].slice(0,MList[i].indexOf('build')).replace(/\*|\_|\?/g,'.').replace(/\-|\/|\+|\?/g,' ')
      }
    }
    obj.env = 'mobile';
    // eslint-disable-next-line brace-style
  }
  // IOS设备
  else if(UA.match(/\(i[^;]+;( U;)? cpu.+mac os x/)){
    obj.equipment = 'IOS';
    if(UA.indexOf('iphone') > -1){
      obj.equipmentOS = 'Iphone'
    }else if(UA.indexOf('ipad') > -1){
      obj.equipmentOS = 'Ipad'
    }else if(UA.indexOf('ipod') > -1){
      obj.equipmentOS = 'Ipod'
    }
    obj.osVersion = UA.slice(UA.lastIndexOf(obj.equipmentOS.toLocaleLowerCase()),UA.indexOf('like')-1).replace(obj.equipmentOS+' os','').replace(/\*|\_|\?/g,'.').replace(/\-|\/|\+|\?/g,' ');
    obj.env = 'mobile';
  }
  // 第二步通用获取浏览类的类型和版本
  let UAList = UA.split(' ');
  let TestList = [
    { test: 'micromessenger',name: 'WeXin',get: 'micromessenger',appMode: 'WX' },
    { test: 'tencenttraveler',name: 'TencentTraveler',get: 'tencenttraveler',appMode: 'browser' },
    { test: 'firefox',name: 'FireFox',get: 'firefox',appMode: 'browser' },
    { test: 'edge',name: 'Edge',get: 'edge',appMode: 'browser' },
    { test: 'bidubrowser',name: 'BaiDuBrowser',get: 'bidubrowser',appMode: 'browser' },
    { test: 'maxthon',name: 'Maxthon',get: 'maxthon',appMode: 'browser' },
    { test: 'qqbrowser',name: 'QQBrowser',get: 'qqbrowser',appMode: 'browser' },
    { test: 'opera',name: 'Opera',get: 'opera',appMode: 'browser' },
    { test: 'opr',name: 'Opera',get: 'opr',appMode: 'browser' },
    { test: 'presto',name: 'Opera',get: 'version',appMode: 'browser' },
    { test: '360se',name: '360SE',get: '360se',appMode: 'browser' },
    { test: '360ee',name: '360EE',get: '360ee',appMode: 'browser' },
    { test: 'metasr',name: 'SoGou',get: 'metasr',appMode: 'browser' },
    { test: 'se',name: 'SoGou',get: 'se',appMode: 'browser' },
    { test: 'the world',name: 'The World',get: 'the world',appMode: 'browser' },
    { test: 'theworld',name: 'The World',get: 'theworld',appMode: 'browser' },
    { test: 'uc',name: 'UC',get: 'uc',appMode: 'browser' },
    { test: 'ubrowser',name: 'UC',get: 'ubrowser',appMode: 'browser' },
    { test: 'lbbrowser',name: 'LBBrowser',get: 'lbbrowser',appMode: 'browser' },
    { test: 'version',name: 'Safari',get: 'version',appMode: 'browser' },
    { test: 'chrome',name: 'Chrome',get: 'chrome',appMode: 'browser' },
    { test: 'iemobile',name: 'IEMobile',get: 'iemobile',appMode: 'browser' },
    { test: 'trident/7.0',name: 'MSIE',get: 'rv:',appMode: 'browser' },
    { test: 'msie',name: 'MSIE',get: 'msie',appMode: 'browser' },
  ];
    /**先判断webkit核心**/
  if(UA.indexOf('khtml') > -1 && UA.indexOf('gecko') > -1 && UA.indexOf('safari') > -1 && UA.indexOf('applewebkit') > -1){
    for(let j=0;j<TestList.length;j++) {
      if (UA.indexOf(TestList[j].test) > -1) {
        obj.browser = TestList[j].name;
        obj.appName = TestList[j].get;
        obj.appMode = TestList[j].appMode;
        // eslint-disable-next-line no-use-before-define
        getBrowserVersion(TestList[j].get);
        break;
      }
    }
  }else{ /**判断非webkit核心浏览器**/
    for(let j=0;j<TestList.length;j++){
      if(UA.indexOf(TestList[j].test) > -1){
        obj.browser = TestList[j].name;
        obj.appName = TestList[j].get;
        obj.appMode = TestList[j].appMode;
        // eslint-disable-next-line no-use-before-define
        getBrowserVersion(TestList[j].get);
        break;
      }
    }
  }

  /**IE内核加以判断**/
  if(UA.indexOf('trident') > -1 || UA.indexOf('msie') > -1){ // IE内核加以判断
    if(UA.indexOf('msie') > -1){
      // eslint-disable-next-line no-use-before-define
      getBrowserVersion('msie')
    }else if(UA.indexOf('trident') > -1){
      // eslint-disable-next-line no-use-before-define
      getBrowserVersion('rv')
    }
    obj.browserVersion = 'IE'+ obj.browserVersion;
  }

  /**浏览器版本获取方法**/
  function getBrowserVersion(browser) {
    for(let k=0;k<UAList.length;k++){
      if(UAList[k].indexOf(browser) > -1){
        UAList[k] = UAList[k].replace(/\;|\:|\)|\*|\_|\-|\/|\+|\?/g,'');
        obj.browserVersion = UAList[k].slice(UAList[k].indexOf(browser)+browser.length,UA.length);
        break;
      }
    }
  }

  let object, appVersion, appMode, appType, appName, gameId;
  if(localStorage.app){
    object = JSON.parse(localStorage.app);
    appVersion = object.appVersion || '';
    appMode = object.appMode || '';
    appType = object.appType || '';
    appName = object.appName || '';
    gameId = object.gameId || '0';
  }else{
    let url = decodeURIComponent(window.location.href);
    appVersion = getStringParam('appVersion', url);
    appMode = getStringParam('from', url);
    appType = getStringParam('appType', url);
    appName = getStringParam('appName', url);
  }
  /**获取当前的URL，做用户判断，?appVersion=1.0&from=app&appType=game&appName=zeroverse&gameId=2**/
  object = { appVersion, appMode, appType, appName, gameId };
  /**获取当前应用的环境信息，APP模式**/
  if(appVersion && appMode && appType && appName && gameId){
    obj = { ...obj, ...object };
    localStorage.app = JSON.stringify(object);
  }
  /**返回**/
  return obj;
};

export default userPlatInfo;
