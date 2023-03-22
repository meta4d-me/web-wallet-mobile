import WalletConnectProvider from '@walletconnect/web3-provider';

const targetChain = 80001;
//
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '4d491126ad1f4b50a1c6b26bb0c623f2', // TODO infuraId
    },
  },
};

//networkParams
const networkParams = {
  // 56
  '0x38': {
    chainId: '0x38',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    chainName: 'Binance Smart Chain',
    nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
    blockExplorerUrls: ['https://bscscan.com'],
  },
  // 4
  '0x4': {
    chainId: '0x4',
    rpcUrls: ['https://rinkeby.infura.io/v3/'],
    chainName: 'Rinkeby',
    nativeCurrency: { name: 'RinkebyETH', decimals: 18, symbol: 'RinkebyETH' },
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
  },
  //5
  '0x5': {
    chainId: '0x5',
    rpcUrls: ['https://goerli.infura.io/v3/'],
    chainName: 'Goerli',
    nativeCurrency: { name: 'GoerliETH', decimals: 18, symbol: 'GoerliETH' },
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
  // 80001
  '0x13881':{
    chainId: '0x13881',
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    chainName: "Matic Mumbai Testnet",
    nativeCurrency: {name: "MATIC", symbol: "MATIC", decimals: 18, },
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  }
};


export {
  providerOptions,
  targetChain,
  networkParams,
};
