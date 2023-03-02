const argvs = process.argv.slice(2);

function getParams (key) {
  let item = argvs.find(item => item.split('=')[0] === key);
  return item ? item.split('=') : []
}

class MultiModule {
  constructor (name, opts) {
    Object.assign(this, {
      name,
      port: 9000,
      host: '0.0.0.0',
      filename: '',
      title: '',
      dev: {
        staticURL: './',
        apiURL: '',
        webURL: '',
        targetChainId: 5,
        dist: 'dev',
      },
      test: {
        staticURL: './',
        apiURL: '',
        webURL: '',
        targetChainId: 5,
        dist: 'test',
      },
      uat: {
        staticURL: './',
        apiURL: '',
        webURL: '',
        targetChainId: 5,
        dist: 'uat',
      },
      prod: {
        staticURL: './',
        apiURL: '',
        webURL: '',
        targetChainId: 56,
        dist: 'prod',
      },
    }, opts)
  }
}

function getModuleProcess (name) {
  let mItem = importModules.find(item => item.name === name);
  return mItem || importModules[0];
}

/**多模块独立配置**/
const importModules = [new MultiModule('demoApp', {
  host: 'localhost',
  filename: 'index.html',
  title: 'web3 wallet demo',
  sysName: 'demoApp',
  bridge: 'unity',
  appId: 1,
})];

let eventName = String(process.env.npm_lifecycle_event).split('-');
let moduleName = getParams('name')[1] || eventName[1];

const envConfig = {
  modules: importModules,
  process: getModuleProcess(moduleName),
  getNodeENV(obj){
    return getENV('node', obj, envConfig.process);
  },
  getBuildENV(obj){
    return getENV('build', obj, envConfig.process);
  },
};

function getENV(type, obj, params){
  let item;
  for(let x in params){
    item = params[x];
    if(typeof item === 'object' && x === JSON.parse(obj.prod)){
      getENV(type, obj, item);
    }
    if(typeof item !== 'object'){
      if(type === 'node'){
        obj[x] = '"'+item+'"';
      }
      if(type === 'build'){
        obj[x] = item;
      }
    }
  }
  return obj;
}

module.exports = envConfig;
