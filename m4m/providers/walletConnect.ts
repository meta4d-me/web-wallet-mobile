import WalletConnectProvider from "@walletconnect/web3-provider";

export interface IWalletConnectConnectorOptions {
  infuraId?: string;
  rpc?: { [chainId: number]: string };
  bridge?: string;
  qrcode?: boolean;
  qrcodeModalOptions?: { mobileLinks?: string[] };
  network?: string;
  chainId: number;
}

const ConnectToWalletConnect = (opts: IWalletConnectConnectorOptions) => {
  return new Promise(async (resolve, reject) => {
    let bridge = "https://bridge.walletconnect.org";
    let qrcode = true;
    let infuraId = "";
    let rpc = undefined;
    let chainId = 1;
    let qrcodeModalOptions = undefined;

    if (opts) {
      bridge = opts.bridge || bridge;
      qrcode = typeof opts.qrcode !== "undefined" ? opts.qrcode : qrcode;
      infuraId = opts.infuraId || "27e484dcd9e3efcfd25a83a78777cdf1";
      rpc = opts.rpc || undefined;
      chainId = opts.chainId || 1;
      qrcodeModalOptions = opts.qrcodeModalOptions || undefined;
    }

    const provider = new WalletConnectProvider({
      bridge,
      qrcode,
      infuraId,
      rpc,
      chainId,
      qrcodeModalOptions,
    });
    try {
      await provider.enable();
      resolve(provider);
    } catch (e) {
      reject(e);
    }
  });
};

export default ConnectToWalletConnect;
