import getProvider, {
  Connector_Types,
  registerCallbacks,
} from "./utils/getProvider";
import { BigNumber, Contract, ethers } from "ethers";
import {
  ERC721Enumerable,
  ERC721Enumerable__factory,
  SimpleM4mNFT,
  SimpleM4mNFT__factory,
} from "./typechain-types";
import { create, urlSource } from "ipfs-http-client";
import { concat } from "uint8arrays";
import { Metadata } from "./types/metadata";
import { _CONTRACT, RPC_NODE } from "./utils/constants";
export * from "./nft";

export { getProvider };

export { Connector_Types } from "./utils/getProvider";
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const connect = async (callback: {
  handleAccountsChanged?: any;
  handleChainChanged?: any;
  handleDisconnect?: any;
  handleError?: any;
}) => {
  registerCallbacks(callback);
  const provider = await getProvider();
  const address = await provider.send("eth_requestAccounts", []);
};
export const disconnect = () => {};

export const getInfo = async () => {
  const provider = await getProvider();
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const chainId = await signer.getChainId();
  console.debug("[m4m-web3-api] connect web3 eth: ", address, chainId);
  return { address, chainId };
};

export const switchNetwork = async (network?: string) => {
  const provider = await getProvider();
  if (!network || network === "mumbai") {
    const chainId = `0x${Number(80001).toString(16)}`;
    await provider.send("wallet_addEthereumChain", [
      {
        chainId,
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        chainName: "Matic Mumbai Testnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      },
    ]);
    // await provider.send("wallet_switchEthereumChain", [{ chainId }]);
  }
  console.log("[m4m-web3-api] switch network: ", network || "Matic Mumbai");
};

const uuidv4 = () => {
  return `${[1e7]}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, (c: any) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

export const login = async (connectorType?: Connector_Types) => {
  const provider = await getProvider(connectorType);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const uuid = uuidv4();
  const sign = await signer.signMessage(`Welcome to Meta4D.Me!
Click to sign in and accept the OpenSea Terms of Service: https://meta4d.me/tos
This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address:
${address}

Nonce:
${uuid}`);
  console.debug("[m4m-web3-api] sign welcome message: ", address, uuid);
  return sign;
};

// ipfsHash has no prefix, only hash.
export const mintNFT = async (owner: string, ipfsHash: string) => {
  const provider = await getProvider();
  const { chainId } = await getInfo();
  // const imgResult = await ipfs.add(urlSource(imgUrl));
  // console.debug("[m4m-web3-api] ipfs uploaded: ", imgResult);
  // metadata.image = "ipfs://" + imgResult.cid.toString();
  // const metadataResult = await ipfs.add(JSON.stringify(metadata));
  const NFT = new Contract(
    _CONTRACT.SimpleM4mNFT[chainId],
    SimpleM4mNFT__factory.abi,
    provider.getSigner()
  ) as SimpleM4mNFT;
  const tx = await NFT.mint(owner, ipfsHash);
  const res = await tx.wait();
  const tokenId =
    res.events && res.events[0] && res.events[0].args && res.events[0].args[2];
  return { tokenId: tokenId ? (tokenId as BigNumber).toNumber() : null };
};

export const loadBlob = async (uri: string) => {
  const cid = uri.indexOf("ipfs://") == 0 ? uri.substring(7) : uri;
  const resp = await ipfs.cat(cid);
  let content = [];
  for await (const chunk of resp) {
    content.push(chunk);
  }
  let result = concat(content);
  const blob = new Blob([result]);
  return blob;
};
const blobToBase64 = async (blob: Blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const getNFT = async (
  tokenId: Number,
  type?: "url" | "blob" | "base64"
) => {
  const { chainId } = await getInfo();
  const NFT = new Contract(
    _CONTRACT.SimpleM4mNFT[chainId],
    SimpleM4mNFT__factory.abi,
    await getProvider()
  ) as ERC721Enumerable;
  const tid = BigNumber.from(tokenId);
  const owner = await NFT.ownerOf(tid);
  const tokenUri = await NFT.tokenURI(tid);
  const source = await loadSource(tokenUri, "blob");
  const info = JSON.parse(await (source as Blob).text());
  const image = await loadSource(info.image, type);
  info.image = image;
  info.tokenId = tokenId;
  info.owner = owner;
  return info;
};

// the nft contract should enumerable
export const getNFTList = async (owner: string, nftContractAddr: string) => {
  const NFT = new Contract(
    nftContractAddr,
    ERC721Enumerable__factory.abi,
    await getProvider()
  ) as ERC721Enumerable;
  const balance = await NFT.balanceOf(owner);
  const list = [];
  for (let i = 0; balance.gt(i); i++) {
    const tokenId = await NFT.tokenOfOwnerByIndex(owner, i);
    const uri = await NFT.tokenURI(tokenId);
    let metadata;
    try {
      const blob = await loadBlob(uri);
      const raw = await blob.text();
      metadata = JSON.parse(raw);
    } catch (err) {
      console.log("load ipfs source failed. ", err);
    }
    list.push({
      tokenId: tokenId,
      uri: uri,
      metadata,
    });
  }
  return list;
};

export const loadSource = async (
  uri: string,
  type?: "url" | "blob" | "base64"
) => {
  let source: string = uri;
  let blob: Blob;
  if (source.startsWith("http://") || source.startsWith("https://")) {
    if (!type || type === "url") return source;
    blob = await fetch(source).then((r) => r.blob());
    if (type === "blob") return blob;
    return await blobToBase64(blob);
  }
  if (source.startsWith("ipfs://")) {
    source = source.substring(7);
  }
  if (!type || type === "url") return `https://ipfs.io/ipfs/${source}`;
  blob = await loadBlob(source);
  if (type === "blob") return blob;
  return await blobToBase64(blob);
};

export const transfer = async (to: string, tokenId: Number) => {
  const provider = await getProvider();
  const { address, chainId } = await getInfo();
  const NFT = new Contract(
    _CONTRACT.SimpleM4mNFT[chainId],
    SimpleM4mNFT__factory.abi,
    provider.getSigner()
  ) as SimpleM4mNFT;
  const tid = BigNumber.from(tokenId);
  const tx = await NFT.transferFrom(address, to, tid);
  const res = await tx.wait();
  return res;
};

export const walletSign = async (privateKey: string, msg: string) => {
  const wallet = new ethers.Wallet(privateKey);
  const sig = await wallet.signMessage(msg);
  return sig;
};
