/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IM4mBaggage, IM4mBaggageInterface } from "../IM4mBaggage";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "m4mTokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uuid",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct IM4mBaggage.LockedNFT",
        name: "info",
        type: "tuple",
      },
    ],
    name: "GameBegin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "m4mTokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uuid",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct IM4mBaggage.LockedNFT",
        name: "info",
        type: "tuple",
      },
    ],
    name: "GameSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "OperatorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "signer",
        type: "address",
      },
    ],
    name: "SignerUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uuid",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "m4mTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "inComponentIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "inAmounts",
        type: "uint256[]",
      },
    ],
    name: "gameBegin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "m4mTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "lootIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lootAmounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lostIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lostAmounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "operatorSig",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "gameSignerSig",
        type: "bytes",
      },
    ],
    name: "gameEnd",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "getGameOwner",
    outputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "m4mTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uuid",
        type: "string",
      },
    ],
    name: "isGameSettled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "m4mTokenId",
        type: "uint256",
      },
    ],
    name: "lockedNFTs",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uuid",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "gameSigner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "setGameSignerAndOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newOperator",
        type: "address",
      },
    ],
    name: "transferOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newSigner",
        type: "address",
      },
    ],
    name: "transferSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IM4mBaggage__factory {
  static readonly abi = _abi;
  static createInterface(): IM4mBaggageInterface {
    return new utils.Interface(_abi) as IM4mBaggageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IM4mBaggage {
    return new Contract(address, _abi, signerOrProvider) as IM4mBaggage;
  }
}
