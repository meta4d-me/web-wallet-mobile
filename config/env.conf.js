const argvs = process.argv.slice(2);

function getParams (key) {
  let item = argvs.find(item => item.split('=')[0] === key);
  return item ? item.split('=') : []
}

class MultiModule {
  constructor (name, opts) {
    Object.assign(this, {
      name,
      port: 9010,
      host: '0.0.0.0',
      filename: '',
      title: '',
      dev: {
        staticURL: './',
        infuraId: '4d491126ad1f4b50a1c6b26bb0c623f2',
        ERCType: '1155',
        nftContract: '0xb6bb4812a8e075cbad0128e318203553c4ca463d',
        targetContract: '0xdd5b1C4685A34Ff07A21Ca2507D4b80e60EbC85f',
        targetChain: 80001,
        dist: 'dev',
      },
      test: {
        staticURL: './',
        infuraId: '4d491126ad1f4b50a1c6b26bb0c623f2',
        ERCType: '1155',
        nftContract: '0xb6bb4812a8e075cbad0128e318203553c4ca463d',
        targetContract: '0xdd5b1C4685A34Ff07A21Ca2507D4b80e60EbC85f',
        targetChain: 80001,
        analyzer: true,
        dist: 'test',
      },
      uat: {
        staticURL: './',
        infuraId: '4d491126ad1f4b50a1c6b26bb0c623f2',
        ERCType: '1155',
        nftContract: '0xb6bb4812a8e075cbad0128e318203553c4ca463d',
        targetContract: '0xdd5b1C4685A34Ff07A21Ca2507D4b80e60EbC85f',
        targetChain: 80001,
        analyzer: true,
        dist: 'uat',
      },
      prod: {
        staticURL: './',
        infuraId: '4d491126ad1f4b50a1c6b26bb0c623f2',
        ERCType: '1155',
        nftContract: '0xb6bb4812a8e075cbad0128e318203553c4ca463d',
        targetContract: '0xdd5b1C4685A34Ff07A21Ca2507D4b80e60EbC85f',
        targetChain: 80001,
        analyzer: true,
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
  title: 'h5 web3 wallet',
  sysName: 'dungeondual',
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
