import WalletConnectProvider from '@walletconnect/web3-provider';

const buyAddress = process.env.buyAddress;
const usdtAddress = process.env.usdtAddress;
const busdAddress = process.env.busdAddress;
const transactionHashAddress = process.env.transactionHashAddress;
const ChainId = process.env.targetChainId;
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
  '0x38': {
    chainId: '0x38',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    chainName: 'Binance Smart Chain',
    nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
    blockExplorerUrls: ['https://bscscan.com'],
  },
  '0x4': {
    chainId: '0x4',
    rpcUrls: ['https://rinkeby.infura.io/v3/'],
    chainName: 'Rinkeby',
    nativeCurrency: { name: 'RinkebyETH', decimals: 18, symbol: 'RinkebyETH' },
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
  },
  '0x5': {
    chainId: '0x5',
    rpcUrls: ['https://goerli.infura.io/v3/'],
    chainName: 'Goerli',
    nativeCurrency: { name: 'GoerliETH', decimals: 18, symbol: 'GoerliETH' },
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
};

const PINATA_API_KEY = 'b17b0b0bffff9b435a1d';
const PINATA_SECRET_API_KEY = '6e55583e7d662c35e1bf37fbb0930d298733326a40771a34bda237b8465bb503';

export {
  buyAddress,
  providerOptions,
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
  busdAddress,
  usdtAddress,
  transactionHashAddress,
  ChainId,
  networkParams,
};
