import {BigNumber} from "ethers";

export interface NFT {
    tokenId: BigNumber,
    uri: string,
    metadata: any,
}