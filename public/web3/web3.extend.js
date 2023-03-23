import Web3Modal from 'web3modal';
import Web3 from 'web3';
import { providerOptions, networkParams } from './config';
import $$ from '@App/$$';
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
    try {
      this.provider = await this.web3Modal().connect()
    } catch(connectError){
      return callback && callback({ err: -1, data: connectError });
    }
    this.web3 = new Web3(this.provider); //钱包实例
    //$$.ENV.env === 'mobile' && this.web3.currentProvider.isMetamask 移动端web3浏览器，小狐狸，imtoken等
    //$$.ENV.env === 'pc' && this.web3.currentProvider.isMetamask pc端唤起小狐狸流程
    //!this.web3.currentProvider.isMetamask pc端扫码，或者移动端浏览器唤起小狐狸流程
    if(type === 'connectWallet' && $$.ENV.env === 'pc' && this.web3.currentProvider.isMetaMask){
      console.log('1. pc for wallet_requestPermissions');
      //await this.subscribeProvider(callback); //事件订阅
      const permissions = await this.web3.eth.currentProvider.request({
        method: 'wallet_requestPermissions',
        params: [{
          'eth_accounts': {
            requiredMethods: ['signTypedData_v4'],
          },
        }],
      });
      console.log();
      console.log('2. permissions', permissions)
    }
    console.log('3. check for network');
    await this.checkNetwork({
      targetChain: $$.apiURLS.targetChain,
      callback: callback,
      userWalletAddress,
      type,
    });
  },
  /**检查钱包链接网络**/
  async checkNetwork(obj){
    let res = { ok: false, data: null }
    if (this.web3.eth && this.web3.eth.currentProvider) {
      console.log('4. web3 has provider');
      let provider = this.web3.eth.currentProvider;
      provider.chainId = Number(provider.chainId);
      console.log(provider);
      /**已经再当前目标链**/
      if(provider.chainId === $$.apiURLS.targetChain){
        console.log('ok: wallet network is same as the target network');
        if(provider.isMetaMask){
          res = { ok: true, data: provider.selectedAddress };
        } else {
          res = { ok: true, data: provider.accounts[0] };
        }
      }
      /**已经不再当前目标链**/
      if(provider.chainId !== $$.apiURLS.targetChain){
        console.log('fail: wallet network is different from the target network');
        try {
          /**选取目标网络**/
          console.log('switch network, wallet_switchEthereumChain');
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: this.toHex($$.apiURLS.targetChain) }],
          });
          console.log('5. switch success and get a provider:', provider);
          // 移动端web3浏览器，pc端唤起小狐狸等，会有isMetaMask字段
          if(provider.isMetaMask){
            res = { ok: true, data: provider.selectedAddress };
          } else {
            res = { ok: true, data: provider.accounts[0] };
          }
        } catch (switchError) {
          console.log('switch network error:', switchError)
          /**移动端兼容代码**/
          if(switchError.code === -32603 && switchError.data && switchError.data.originalError){
            switchError.code = switchError.data.originalError.code;
            switchError.message = switchError.data.originalError.message;
          }
          /**用户拒绝**/
          if (switchError.code === 4001 || JSON.stringify(switchError).includes('4001')) {
            console.log('user reject switch:', switchError)
            res.data = switchError.message;
          }
          if (switchError.code === 4902
              || JSON.stringify(switchError).includes('4902')
              || JSON.stringify(switchError).includes('wallet_addEthereumChain')
              || switchError.message.includes('Unrecognized chain ID "0x13881"')
              || switchError.message.includes('wallet_addEthereumChain')
          ) {
            /**没有这个网络**/
            console.log('add step: add network', switchError)
            try {
              await provider.request({
                method: 'wallet_addEthereumChain',
                params: [networkParams[this.toHex($$.apiURLS.targetChain)]],
              });
              // 移动端web3浏览器，pc端唤起小狐狸等，会有isMetaMask字段
              console.log('add network success !')
              if(provider.isMetaMask){
                res = { ok: true, data: provider.selectedAddress };
              } else {
                res = { ok: true, data: provider.accounts[0] };
              }
            } catch (addError) {
              console.log('add network error:', addError)
              /**用户拒绝**/
              res.data = addError.message;
            }
          }
        }
      }
    }
    /**用户拒绝切换网络**/
    if (!res.ok) {
      return obj.callback && obj.callback({ err: -1, data: res.data });
    }
    console.log('6. next step: to return back the obj');
    obj.userWalletAddress = obj.userWalletAddress && obj.userWalletAddress.toUpperCase() || '';
    console.log('res:::', res);
    let params = {
      web3: this.web3,
      provider: this.provider,
      connected: true,
      userAddress: res.data,
      chainId: await this.web3.eth.getChainId(),
      networkId: await this.web3.eth.net.getId(),
    }
    /**连接钱包**/
    if(obj.type === 'connectWallet'){
      this.hasConnected = true;
      return await this.connectWallet(obj, params);
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
  async getSignature(token, userAddress){
    console.log('getSignature: ', token, userAddress);
    return await this.web3.eth.personal.sign(token, userAddress);
  },
  async subscribeProvider(fn){
    if(this.hasConnected){
      return;
    }
    /**断网监听**/
    this.provider.on('disconnect', async() => {
      console.log('wallet disconnect !')
      await this.resetApp();
    });
    /**账号切换监听**/
    this.provider.on('accountsChanged', async (accounts) => {
      console.log('accountsChanged: ', accounts);
      return fn && fn({ err: 2, data: accounts });
    });
    /**链切换监听**/
    this.provider.on('chainChanged', async (chainId) => {
      console.log('chainChanged: ', chainId);
      return fn && fn({ err: 3, data: chainId });
    });
  },
  async resetApp(){
    if (this.web3 && this.web3.eth && this.web3.eth.currentProvider && this.web3.eth.currentProvider.close) {
      await this.web3.eth.currentProvider.close();
    }
    this.web3Modal().clearCachedProvider();
  },
};
