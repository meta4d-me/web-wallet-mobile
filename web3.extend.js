import Web3Modal from 'web3modal';
import Web3 from 'web3';
import { providerOptions, networkParams } from './config';
import $$ from '@gwApp/$$'; // 自定义类
export default {
  web3: null,
  provider: null,
  hasConnected: false,
  web3Modal(){
    return new Web3Modal({
      theme: 'dark',
      network: 'mainnet',
      //cacheProvider: true, // optional
      //disableInjectedProvider: true,
      providerOptions,
    });
  },
  async init(type, userWalletAddress, callback){
    //console.log(process.env.ChainId)
    try {
      this.provider = await this.web3Modal().connect()
    } catch(connectError){
      return callback && callback({ err: -1, data: connectError });
    }
    console.log('this.provider:::', this.provider);
    this.web3 = new Web3(this.provider); //钱包实例
    console.log('this.web3:::', this.web3);
    console.log('$$:::', $$);
    //return;
    //$$.ENV.env === 'mobile' && this.web3.currentProvider.isMetamask 移动端web3浏览器，小狐狸，imtoken等
    //$$.ENV.env === 'pc' && this.web3.currentProvider.isMetamask pc端唤起小狐狸流程
    //!this.web3.currentProvider.isMetamask pc端扫码，或者移动端浏览器唤起小狐狸流程
    if(type === 'connectWallet' && $$.ENV.env === 'pc' && this.web3.currentProvider.isMetaMask){
      console.log('1');
      //await this.subscribeProvider(callback); //事件订阅
      const permissions = await this.web3.eth.currentProvider.request({
        method: 'wallet_requestPermissions',
        params: [{
          'eth_accounts': {
            requiredMethods: ['signTypedData_v4'],
          },
        }],
      });
      console.log('2');
      console.log(permissions)
    }
    console.log('3');
    await this.checkNetwork({
      targetChain: process.env.ChainId,
      callback: callback,
      userWalletAddress,
      type,
    });
  },
  /**检查钱包链接网络**/
  async checkNetwork(obj){
    let res = { ok: false, data: null }
    if (this.web3.eth && this.web3.eth.currentProvider) {
      console.log('4');
      let provider = this.web3.eth.currentProvider;
      try {
        /**选取目标网络**/
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: this.toHex(obj.targetChain) }],
        });
        console.log('5:', provider);
        // 移动端web3浏览器，pc端唤起小狐狸等，会有isMetaMask字段
        if(provider.isMetaMask){
          res = { ok: true, data: provider.selectedAddress };
        } else {
          res = { ok: true, data: provider.accounts[0] };
        }
      } catch (switchError) {
        console.log('switchError::', switchError)
        /**用户拒绝**/
        if (switchError.code === 4001) {
          res.data = switchError.message;
        }
        if (switchError.code === 4902) {
          /**没有这个网络**/
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [networkParams[this.toHex(obj.targetChain)]],
            });
            // 移动端web3浏览器，pc端唤起小狐狸等，会有isMetaMask字段
            if(provider.isMetaMask){
              res = { ok: true, data: provider.selectedAddress };
            } else {
              res = { ok: true, data: provider.accounts[0] };
            }
            //res = { ok: true, data: provider.selectedAddress };
          } catch (addError) {
            console.log('addError::', addError)
            /**用户拒绝**/
            res.data = addError.message;
          }
        }
      }
    }
    /**用户拒绝切换网络**/
    if (!res.ok) {
      return obj.callback && obj.callback({ err: -1, data: res.data });
    }
    console.log('6');
    obj.userWalletAddress = obj.userWalletAddress && obj.userWalletAddress.toUpperCase() || '';
    let networkId = await this.web3.eth.net.getId();
    let chainId = await this.web3.eth.getChainId();
    console.log('res:::', res);
    let params = {
      web3: this.web3,
      provider: this.provider,
      connected: true,
      userAddress: res.data,
      chainId: chainId,
      networkId: networkId,
    }
    /**购买节点**/
    if(obj.type === 'buyNodes'){
      return await this.buyNodesSteps(obj, params);
    }
    /**连接钱包**/
    if(obj.type === 'connectWallet'){
      this.hasConnected = true;
      return await this.connectWallet(obj, params);
    }
  },
  /**购买节点流程**/
  async buyNodesSteps(obj, params){
    /**已绑定，钱包地址，不一致 判定切换**/
    if(obj.userWalletAddress && obj.userWalletAddress !== params.userAddress.toUpperCase()){
      console.log(obj, params);
      return obj.callback && obj.callback({ err: -2, data: '' });
    }
    /**已绑定，已连接**/
    if (obj.userWalletAddress) {
      return obj.callback && obj.callback({ err: 0, data: params });
    }
    /**未绑定，已连接**/
    if (!obj.userWalletAddress) {
      return obj.callback && obj.callback({ err: 1, data: params });
    }
  },
  /**连接钱包**/
  connectWallet(obj, params){
    return obj.callback && obj.callback({ err: 0, data: params });
  },
  /**十进制转十六进制**/
  toHex(num) {
    const val = Number(num);
    return '0x' + val.toString(16);
  },
  getUserBalance(userAddress){
    return this.web3.eth.getBalance(userAddress).then((res) => (res ? this.web3.utils.fromWei(res.toString(), 'ether') : 0))
  },
  async getSignature(token, userAddress){
    return await this.web3.eth.personal.sign(token, userAddress);
  },
  async getAccountAssets(){
    this.fetching = true;
    try {
      this.assets = await this.getUserBalance();
      this.fetching = false;
    } catch (error) {
      this.fetching = false;
    }
  },
  async subscribeProvider(fn){
    if(this.hasConnected){
      return;
    }
    /**断网监听**/
    this.provider.on('disconnect', async() => {
      console.log('断开了')
      await this.resetApp();
    });
    /**账号切换监听**/
    this.provider.on('accountsChanged', async (accounts) => {
      console.log('账号切换', accounts);
      return fn && fn({ err: 2, data: accounts });
    });
    /**链切换监听**/
    this.provider.on('chainChanged', async (chainId) => {
      console.log('链切换', chainId);
      return fn && fn({ err: 3, data: chainId });
    });
  },
  async resetApp(){
    if (this.web3 && this.web3.eth && this.web3.eth.currentProvider && this.web3.eth.currentProvider.close) {
      await this.web3.eth.currentProvider.close();
    }
    this.web3Modal().clearCachedProvider();
  },
  // 添加货币
  async addWalletAsset(obj){
    console.log('addWalletAsset::', obj);
    if (this.web3.eth && this.web3.eth.currentProvider) {
      let provider = this.web3.eth.currentProvider;
      try {
        /**选取目标网络**/
        let param = {
          type: 'ERC20',
          options: {
            address: obj.contract,
            symbol: obj.symbol,
            decimals: Math.log(obj.decimals) * Math.LOG10E,
            image: obj.image,
          },
        }
        await provider.request({
          method: 'wallet_watchAsset',
          params: param,
        });
        return obj.callback && obj.callback({ err: 0 });
      } catch (switchError) {
        console.log('switchError::', switchError)
        return obj.callback && obj.callback({ err: -1 });
      }
    }
  },
};
