import Web3Modal from 'web3modal';
import { providerOptions, targetChain } from '../config';
import Web3 from "web3";
/**
const ConnectToInjected = async () => {
  const web3Modal = () => {
    return new Web3Modal({
      theme: 'dark',
      network: 'mainnet',
      //cacheProvider: true, // optional
      //disableInjectedProvider: true,
      providerOptions
    });
  };
  try {
    return await web3Modal().connect();
  } catch(connectError){
    return { err: -1, data: connectError }
    //showFailToast(JSON.stringify(connectError));
    //return callback && callback({ err: -1, data: connectError });
  }
};**/
const ConnectToInjected = async () => {
  let provider = null, web3 = null;
  console.log('provider', window.ethereum)
  if (typeof window.ethereum !== "undefined") {
    provider = window.ethereum;
    try {
      console.log('a')
      await provider.request({ method: "eth_requestAccounts", params: [] });
      console.log('window.ethereum', window.ethereum);
    } catch (error) {
      console.log('b')
     // throw new Error("User Rejected");
      provider = { code: -1, data: "User Rejected" }
    }
  } else {
    const web3Modal = () => {
      return new Web3Modal({
        theme: 'dark',
        network: 'mainnet',
        //cacheProvider: true, // optional
        //disableInjectedProvider: true,
        providerOptions
      });
    };
    try {
      console.log('c')
      let connect = await web3Modal().connect();
      console.log(connect);
      web3 = new Web3(connect); //钱包实例
      console.log(web3);
      provider = web3.eth.currentProvider;
      /**选取目标网络**/
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.toHex(targetChain) }],
      });
      console.log("cprovider", provider)
    } catch(connectError){
      console.log('d')
      provider = { code: -1, data: connectError }
      //showFailToast(JSON.stringify(connectError));
      //return callback && callback({ err: -1, data: connectError });
    }
    //throw new Error("No Web3 Provider found");
    //return { code: -1, data: "No Web3 Provider found" }
  }
  return provider;
};
export default ConnectToInjected;

