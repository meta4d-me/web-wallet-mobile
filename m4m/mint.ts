import getProvider from "./utils/getProvider";
import {
    ERC721__factory,
    ERC1155Upgradeable__factory,
    M4mBaggageWithoutRole,
    M4mBaggageWithoutRole__factory,
    M4mComponentV2
} from "./typechain-types";
import { Contract, ethers } from "ethers";

export const isApprovalForAll =  async (
    type: "erc721" | "erc1155",
    userAddr: string,
    nftContract: string,
    targetContract: string,
    provider?: any
) => {
    provider = provider && new ethers.providers.Web3Provider(provider) || await getProvider('Injected');
    //const provider = await getProvider('Injected');
    console.log('isApprovalForAll provider', provider);
    console.log('isApprovalForAll getSigner', provider.getSigner())
    let nft = new Contract(
        nftContract,
        type === "erc721" ? ERC721__factory.abi : ERC1155Upgradeable__factory.abi,
        provider.getSigner()
    ) as M4mComponentV2;
    console.log('isApprovalForAll nft', nft)
    let tx = await nft.isApprovedForAll(userAddr, targetContract);
    return tx;
}

export const setApprovalForAll = async (
    type: "erc721" | "erc1155",
    address: string,
    nftContract: string,
    targetContract: string
) => {
    //const provider = await getProvider('WalletConnect');
    const provider = await getProvider('Injected');
    const nft = new Contract(
        nftContract,
        type === "erc721" ? ERC721__factory.abi : ERC1155Upgradeable__factory.abi,
        provider.getSigner()
    );
    const tx = await nft.setApprovalForAll(targetContract, true);
    const res = await tx.wait();
    return res;
};

/**获取用户签名哈希https://github.com/meta4d-me/meta4d-nft/blob/master/test/TestBaggage.js#L91**/
export const getOperatorSig = async (
    owner: string,
    m4mNFTId: number,
    gameId: number,
    uuid: string,
    lootIds: number[],
    lootAmounts: number[],
    lostIds: number[],
    lostAmounts: number[]
) => {
    return ethers.utils.solidityKeccak256(['bytes'],
        [ethers.utils.solidityPack(['address', 'uint', 'uint', 'string', 'uint[1]', 'uint[1]', 'uint[4]', 'uint[4]'],
            [owner, m4mNFTId, gameId, uuid, lootIds, lootAmounts, lostIds, lostAmounts])]);
};

/**自定义游戏签名https://github.com/meta4d-me/meta4d-nft/blob/master/test/TestBaggage.js#L91**/
export const getGameSignerHash = async(
    params:{tokenId: number;
        prepare: boolean;
        name: string;
        symbol: string;
        amount: number;
    }[],
    m4mNFTId:string,
    gameId:number,
    nonce:number | string) => {
    let paramsHashes = [];
    for (const param of params) {
        paramsHashes.push(ethers.utils.solidityKeccak256(['bytes'],
            [ethers.utils.solidityPack(['uint', 'bool', 'string', 'string', 'uint'],
                [param.tokenId, param.prepare, param.name, param.symbol, param.amount])]));
    }
    console.log('paramsHashes', paramsHashes)
    let hash = ethers.utils.solidityKeccak256(['bytes'],
        [ethers.utils.solidityPack(['uint', 'uint', 'uint', `bytes32[${params.length}]`],
            [m4mNFTId, gameId, Number(nonce), paramsHashes])]);
    console.log('hash', hash);
    return hash;
};

/**自定义游戏签名https://github.com/meta4d-me/meta4d-nft/blob/master/test/TestBaggage.js#L91**/
export const getLocalGameSignerSig = async(signHash:string, KEY:string) => {
    let gameSigningKey = new ethers.utils.SigningKey('0x' + KEY)
    return ethers.utils.joinSignature(await gameSigningKey.signDigest(signHash));
};

export const handleGameEnd = async (
    targetContract: string,
    m4mTokenId: number,
    nonce: number,
    params: {
        tokenId: number;
        prepare: boolean;
        name: string;
        symbol: string;
        amount: number;
    }[],
    operatorSig: string,
    gameSignerSig: string,
    overrides?: any
) => {
    const provider = await getProvider();
    const signer = provider.getSigner();
    const baggage = new Contract(targetContract, M4mBaggageWithoutRole__factory.abi, signer) as M4mBaggageWithoutRole;
    console.log('入参', 'm4mTokenId='+m4mTokenId, 'nonce='+nonce, 'params='+params, 'operatorSig='+Buffer.from(''), 'gameSignerSig='+gameSignerSig);
    console.log('params', params)
    let tx = await baggage.settleNewLoots(m4mTokenId, nonce, params, Buffer.from(''), gameSignerSig);
    return await tx.wait();
};

export const handleUnlockComponents = async(
    targetContract: string,
    m4mTokenId: number,
    nonce: number,
    outComponentIds: number[],
    operatorSig: string,
    gameSignerSig: string
) => {
    const provider = await getProvider();
    const signer = provider.getSigner();
    const baggage = new Contract(targetContract, M4mBaggageWithoutRole__factory.abi, signer) as M4mBaggageWithoutRole;
    let tx = await baggage.unlockComponents(m4mTokenId, nonce, outComponentIds, operatorSig, gameSignerSig);
    return await tx.wait();
}

export const handleLockComponents = async(
    provider: any,
    targetContract: string,
    m4mTokenId: number,
    gameId: number,
    inComponentIds: number[],
    inAmounts: number[],
) => {
    provider = provider && new ethers.providers.Web3Provider(provider) || await getProvider('Injected');
    //const provider = await getProvider();
    const signer = provider.getSigner();
    const baggage = new Contract(targetContract, M4mBaggageWithoutRole__factory.abi, signer) as M4mBaggageWithoutRole;
    console.log('handleLockComponents baggage', baggage);
    let info = await baggage.lockedEmptyNFTs(m4mTokenId);
    console.log('handleLockComponents info', info);
    if(info.owner){
        return {success:true};
    }else{
        let tx = await baggage.lockComponents(m4mTokenId, gameId, inComponentIds, inAmounts);
        return await tx.wait();
    }
}


