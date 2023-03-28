// @ts-ignore
import getProvider from '@m4m/utils/getProvider';
// @ts-ignore
import { ERC721__factory } from '@m4m/typechain-types/factories/ERC721__factory';
// @ts-ignore
import { ERC1155Upgradeable__factory } from '@m4m/typechain-types/factories/ERC1155Upgradeable__factory';
// @ts-ignore
import { M4mBaggageWithoutRole__factory } from '@m4m/typechain-types/factories/M4mBaggageWithoutRole__factory';
// @ts-ignore
import { M4mBaggageWithoutRole } from '@m4m/typechain-types/M4mBaggageWithoutRole';
// @ts-ignore
import { M4mComponentV2 } from '@m4m/typechain-types/M4mComponentV2';
import { Contract, ethers } from "ethers";

/**provider: any, type: "erc721" | "erc1155",userAddr: string,nftContract: string,targetContract: string**/
export const isApprovalForAll =  async (provider, type, userAddr, nftContract, targetContract) => {
    provider = provider && new ethers.providers.Web3Provider(provider) || await getProvider('Injected');
    console.log('isApprovalForAll provider', provider);
    console.log('isApprovalForAll getSigner', provider.getSigner())
    let nft = new Contract(nftContract, type === "erc721" ? ERC721__factory.abi : ERC1155Upgradeable__factory.abi, provider.getSigner()) as M4mComponentV2;
    console.log('isApprovalForAll nft', nft)
    let tx = await nft.isApprovedForAll(userAddr, targetContract);
    return tx; // 返回boolean
}

/**provider: any,type: "erc721" | "erc1155", address: string, nftContract: string,targetContract: string**/
export const setApprovalForAll = async (provider, type, address, nftContract, targetContract) => {
    provider = provider && new ethers.providers.Web3Provider(provider) || await getProvider('Injected');
    const nft = new Contract(
        nftContract,
        type === "erc721" ? ERC721__factory.abi : ERC1155Upgradeable__factory.abi,
        provider.getSigner()
    );
    console.log('setApprovalForAll nft', nft)
    const tx = await nft.setApprovalForAll(targetContract, true);
    const res = await tx.wait();
    return res;
};

/** 获取用户签名哈希https://github.com/meta4d-me/meta4d-nft/blob/master/test/TestBaggage.js#L91
 * owner: string, m4mNFTId: number, gameId: number,uuid: string,lootIds: number[], lootAmounts: number[],lostIds: number[],lostAmounts: number[]
 * **/
export const getOperatorSig = async (owner, m4mNFTId, gameId, uuid, lootIds, lootAmounts, lostIds, lostAmounts) => {
    return ethers.utils.solidityKeccak256(['bytes'],
        [ethers.utils.solidityPack(['address', 'uint', 'uint', 'string', 'uint[1]', 'uint[1]', 'uint[4]', 'uint[4]'],
            [owner, m4mNFTId, gameId, uuid, lootIds, lootAmounts, lostIds, lostAmounts])]);
};

/**自定义游戏签名https://github.com/meta4d-me/meta4d-nft/blob/master/test/TestBaggage.js#L91
 * params:{tokenId: number;prepare: boolean;name: string;symbol: string;amount: number;}[], m4mNFTId:string, gameId:number, nonce:number | string
**/
export const getGameSignerHash = async(params, m4mNFTId, gameId, nonce) => {
    let paramsHashes = [];
    for (const param of params) {
        paramsHashes.push(ethers.utils.solidityKeccak256(['bytes'],
            [ethers.utils.solidityPack(['uint', 'bool', 'string', 'string', 'uint'],
                [param.tokenId, param.prepare, param.name, param.symbol, param.amount])]));
    }
    console.log('paramsHashes', paramsHashes)
    let hash = ethers.utils.solidityKeccak256(['bytes'],
        [ethers.utils.solidityPack(['uint', 'uint', 'uint', `bytes32[${params.length}]`],
            [m4mNFTId, gameId, nonce, paramsHashes])]);
    console.log('hash', hash);
    return hash;
};

/**自定义游戏签名https://github.com/meta4d-me/meta4d-nft/blob/master/test/TestBaggage.js#L91
 * signHash:string, KEY:string
 * **/
export const getLocalGameSignerSig = async(signHash, KEY) => {
    let gameSigningKey = new ethers.utils.SigningKey('0x' + KEY)
    return ethers.utils.joinSignature(await gameSigningKey.signDigest(signHash));
};

/**provider: any,targetContract: string,m4mTokenId: number,nonce: number,params: {tokenId: number;prepare: boolean;name: string;symbol: string; amount: number;}[],
 operatorSig: string,gameSignerSig: string,overrides?: any**/
export const handleGameEnd = async (provider, targetContract, m4mTokenId, nonce, params, operatorSig, gameSignerSig) => {
    provider = provider && new ethers.providers.Web3Provider(provider) || await getProvider('Injected');
    const baggage = new Contract(targetContract, M4mBaggageWithoutRole__factory.abi,  provider.getSigner()) as M4mBaggageWithoutRole;
    console.log('settleNewLoots baggage', baggage);
    console.log('settleNewLoots 入参', 'm4mTokenId='+m4mTokenId, 'nonce='+nonce, 'params='+params, 'operatorSig='+Buffer.from(''), 'gameSignerSig='+gameSignerSig);
    console.log('settleNewLoots params', params)
    let tx = await baggage.settleNewLoots(m4mTokenId, nonce, params, Buffer.from(''), gameSignerSig);
    return await tx.wait();
};

/**provider: any, targetContract: string, m4mTokenId: number, nonce: number, outComponentIds: number[], operatorSig: string, gameSignerSig: string**/
export const handleUnlockComponents = async(provider, targetContract, m4mTokenId, nonce, outComponentIds, operatorSig, gameSignerSig) => {
    provider = provider && new ethers.providers.Web3Provider(provider) || await getProvider('Injected');
    const baggage = new Contract(targetContract, M4mBaggageWithoutRole__factory.abi, provider.getSigner()) as M4mBaggageWithoutRole;
    console.log('handleUnlockComponents baggage', baggage);
    let tx = await baggage.unlockComponents(m4mTokenId, nonce, outComponentIds, operatorSig, gameSignerSig);
    return await tx.wait();
}

/**provider: any, targetContract: string, m4mTokenId: number, gameId: number, inComponentIds: number[], inAmounts: number[]**/
export const handleLockComponents = async(provider, targetContract, m4mTokenId, gameId, inComponentIds, inAmounts) => {
    console.log('targetContract', targetContract);
    console.log('m4mTokenId', m4mTokenId);
    console.log('gameId', gameId);
    console.log('inComponentIds', inComponentIds);
    console.log('inAmounts', inAmounts);
    //inComponentIds = [];
    //inAmounts = [];
    provider = provider && new ethers.providers.Web3Provider(provider) || await getProvider('Injected');
    const baggage = new Contract(targetContract, M4mBaggageWithoutRole__factory.abi, provider.getSigner()) as M4mBaggageWithoutRole;
    console.log('handleLockComponents baggage', baggage);
    let info = await baggage.lockedEmptyNFTs(m4mTokenId);
    console.log('handleLockComponents info', info);
    console.log('handleLockComponents info gameId',Number(info.gameId));
    if(!!Number(info.gameId)){
        return {success:true};
    }else{
        console.log('handleLockComponents tx step');
        let tx = await baggage.lockComponents(m4mTokenId, gameId, inComponentIds, inAmounts);
        console.log('handleLockComponents tx', tx);
        return await tx.wait();
    }
}


