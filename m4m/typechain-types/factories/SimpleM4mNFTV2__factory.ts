/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SimpleM4mNFTV2,
  SimpleM4mNFTV2Interface,
} from "../SimpleM4mNFTV2";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
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
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenIndex",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mintPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "minter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenIndex",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIndex",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "safeMintBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
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
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001dea38038062001dea8339810160408190526200003491620001e1565b8151829082906200004d9060009060208501906200006e565b508051620000639060019060208401906200006e565b505050505062000288565b8280546200007c906200024b565b90600052602060002090601f016020900481019282620000a05760008555620000eb565b82601f10620000bb57805160ff1916838001178555620000eb565b82800160010185558215620000eb579182015b82811115620000eb578251825591602001919060010190620000ce565b50620000f9929150620000fd565b5090565b5b80821115620000f95760008155600101620000fe565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013c57600080fd5b81516001600160401b038082111562000159576200015962000114565b604051601f8301601f19908116603f0116810190828211818310171562000184576200018462000114565b81604052838152602092508683858801011115620001a157600080fd5b600091505b83821015620001c55785820183015181830184015290820190620001a6565b83821115620001d75760008385830101525b9695505050505050565b60008060408385031215620001f557600080fd5b82516001600160401b03808211156200020d57600080fd5b6200021b868387016200012a565b935060208501519150808211156200023257600080fd5b5062000241858286016200012a565b9150509250929050565b600181811c908216806200026057607f821691505b602082108114156200028257634e487b7160e01b600052602260045260246000fd5b50919050565b611b5280620002986000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80636352211e116100b8578063ac8d856c1161007c578063ac8d856c14610278578063b88d4fde146102a1578063c87b56dd146102b4578063e67e402c146102c7578063e985e9c5146102da578063f626cf2c1461031657600080fd5b80636352211e1461022a57806370a082311461023d5780637e4831d31461025057806395d89b411461025d578063a22cb4651461026557600080fd5b806323b872dd116100ff57806323b872dd146101cb5780632f745c59146101de57806342842e0e146101f15780634f6ccce71461020457806354948a251461021757600080fd5b806301ffc9a71461013c57806306fdde0314610164578063081812fc14610179578063095ea7b3146101a457806318160ddd146101b9575b600080fd5b61014f61014a366004611456565b610329565b60405190151581526020015b60405180910390f35b61016c610354565b60405161015b91906114c7565b61018c6101873660046114da565b6103e6565b6040516001600160a01b03909116815260200161015b565b6101b76101b236600461150f565b61040d565b005b6008545b60405190815260200161015b565b6101b76101d9366004611539565b610528565b6101bd6101ec36600461150f565b610559565b6101b76101ff366004611539565b6105ef565b6101bd6102123660046114da565b61060a565b6101b7610225366004611634565b61069d565b61018c6102383660046114da565b6106e5565b6101bd61024b36600461170f565b610745565b600a5461014f9060ff1681565b61016c6107cb565b6101b761027336600461172a565b6107da565b61018c6102863660046114da565b600c602052600090815260409020546001600160a01b031681565b6101b76102af366004611766565b6107e9565b61016c6102c23660046114da565b61081b565b6101b76102d53660046117e2565b610856565b61014f6102e836600461182f565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101b76103243660046117e2565b6108f9565b60006001600160e01b0319821663780e9d6360e01b148061034e575061034e82610959565b92915050565b60606000805461036390611862565b80601f016020809104026020016040519081016040528092919081815260200182805461038f90611862565b80156103dc5780601f106103b1576101008083540402835291602001916103dc565b820191906000526020600020905b8154815290600101906020018083116103bf57829003601f168201915b5050505050905090565b60006103f1826109a9565b506000908152600460205260409020546001600160a01b031690565b6000610418826106e5565b9050806001600160a01b0316836001600160a01b0316141561048b5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806104a757506104a781336102e8565b6105195760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152608401610482565b6105238383610a0b565b505050565b6105323382610a79565b61054e5760405162461bcd60e51b81526004016104829061189d565b610523838383610af8565b600061056483610745565b82106105c65760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b6064820152608401610482565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b610523838383604051806020016040528060008152506107e9565b600061061560085490565b82106106785760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b6064820152608401610482565b6008828154811061068b5761068b6118ea565b90600052602060002001549050919050565b60005b83518110156106df576106cd8482815181106106be576106be6118ea565b602002602001015184846108f9565b806106d781611916565b9150506106a0565b50505050565b6000818152600260205260408120546001600160a01b03168061034e5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610482565b60006001600160a01b0382166107af5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610482565b506001600160a01b031660009081526003602052604090205490565b60606001805461036390611862565b6107e5338383610c69565b5050565b6107f33383610a79565b61080f5760405162461bcd60e51b81526004016104829061189d565b6106df84848484610d38565b6060600b60008381526020019081526020016000206040516020016108409190611931565b6040516020818303038152906040529050919050565b6000838152600c602052604090205483906001600160a01b0316156108ac5760405162461bcd60e51b815260206004820152600c60248201526b1d1bdad95b9259081d5cd95960a21b6044820152606401610482565b6108b68385610d6b565b6000848152600b6020908152604090912083516108d5928501906113a7565b505050600091825250600c6020526040902080546001600160a01b03191633179055565b6000838152600c602052604090205483906001600160a01b03161561094f5760405162461bcd60e51b815260206004820152600c60248201526b1d1bdad95b9259081d5cd95960a21b6044820152606401610482565b6108b68385610f04565b60006001600160e01b031982166380ac58cd60e01b148061098a57506001600160e01b03198216635b5e139f60e01b145b8061034e57506301ffc9a760e01b6001600160e01b031983161461034e565b6000818152600260205260409020546001600160a01b0316610a085760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610482565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610a40826106e5565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610a85836106e5565b9050806001600160a01b0316846001600160a01b03161480610acc57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610af05750836001600160a01b0316610ae5846103e6565b6001600160a01b0316145b949350505050565b826001600160a01b0316610b0b826106e5565b6001600160a01b031614610b315760405162461bcd60e51b8152600401610482906119e6565b6001600160a01b038216610b935760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610482565b610ba08383836001610f1e565b826001600160a01b0316610bb3826106e5565b6001600160a01b031614610bd95760405162461bcd60e51b8152600401610482906119e6565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b03161415610ccb5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610482565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610d43848484610af8565b610d4f8484848461105e565b6106df5760405162461bcd60e51b815260040161048290611a2b565b6001600160a01b038216610dc15760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610482565b6000818152600260205260409020546001600160a01b031615610e265760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610482565b610e34600083836001610f1e565b6000818152600260205260409020546001600160a01b031615610e995760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610482565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6107e582826040518060200160405280600081525061115c565b610f2a8484848461118f565b6001811115610f995760405162461bcd60e51b815260206004820152603560248201527f455243373231456e756d657261626c653a20636f6e7365637574697665207472604482015274185b9cd9995c9cc81b9bdd081cdd5c1c1bdc9d1959605a1b6064820152608401610482565b816001600160a01b038516610ff557610ff081600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b611018565b836001600160a01b0316856001600160a01b031614611018576110188582611217565b6001600160a01b0384166110345761102f816112b4565b611057565b846001600160a01b0316846001600160a01b031614611057576110578482611363565b5050505050565b60006001600160a01b0384163b1561115157604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906110a2903390899088908890600401611a7d565b6020604051808303816000875af19250505080156110dd575060408051601f3d908101601f191682019092526110da91810190611aba565b60015b611137573d80801561110b576040519150601f19603f3d011682016040523d82523d6000602084013e611110565b606091505b50805161112f5760405162461bcd60e51b815260040161048290611a2b565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610af0565b506001949350505050565b6111668383610d6b565b611173600084848461105e565b6105235760405162461bcd60e51b815260040161048290611a2b565b60018111156106df576001600160a01b038416156111d5576001600160a01b038416600090815260036020526040812080548392906111cf908490611ad7565b90915550505b6001600160a01b038316156106df576001600160a01b0383166000908152600360205260408120805483929061120c908490611aee565b909155505050505050565b6000600161122484610745565b61122e9190611ad7565b600083815260076020526040902054909150808214611281576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b6008546000906112c690600190611ad7565b600083815260096020526040812054600880549394509092849081106112ee576112ee6118ea565b90600052602060002001549050806008838154811061130f5761130f6118ea565b600091825260208083209091019290925582815260099091526040808220849055858252812055600880548061134757611347611b06565b6001900381819060005260206000200160009055905550505050565b600061136e83610745565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b8280546113b390611862565b90600052602060002090601f0160209004810192826113d5576000855561141b565b82601f106113ee57805160ff191683800117855561141b565b8280016001018555821561141b579182015b8281111561141b578251825591602001919060010190611400565b5061142792915061142b565b5090565b5b80821115611427576000815560010161142c565b6001600160e01b031981168114610a0857600080fd5b60006020828403121561146857600080fd5b813561147381611440565b9392505050565b6000815180845260005b818110156114a057602081850181015186830182015201611484565b818111156114b2576000602083870101525b50601f01601f19169290920160200192915050565b602081526000611473602083018461147a565b6000602082840312156114ec57600080fd5b5035919050565b80356001600160a01b038116811461150a57600080fd5b919050565b6000806040838503121561152257600080fd5b61152b836114f3565b946020939093013593505050565b60008060006060848603121561154e57600080fd5b611557846114f3565b9250611565602085016114f3565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156115b4576115b4611575565b604052919050565b600067ffffffffffffffff8311156115d6576115d6611575565b6115e9601f8401601f191660200161158b565b90508281528383830111156115fd57600080fd5b828260208301376000602084830101529392505050565b600082601f83011261162557600080fd5b611473838335602085016115bc565b60008060006060848603121561164957600080fd5b833567ffffffffffffffff8082111561166157600080fd5b818601915086601f83011261167557600080fd5b813560208282111561168957611689611575565b8160051b61169882820161158b565b928352848101820192828101908b8511156116b257600080fd5b958301955b848710156116d0578635825295830195908301906116b7565b98506116e09150508882016114f3565b9550505060408601359150808211156116f857600080fd5b5061170586828701611614565b9150509250925092565b60006020828403121561172157600080fd5b611473826114f3565b6000806040838503121561173d57600080fd5b611746836114f3565b91506020830135801515811461175b57600080fd5b809150509250929050565b6000806000806080858703121561177c57600080fd5b611785856114f3565b9350611793602086016114f3565b925060408501359150606085013567ffffffffffffffff8111156117b657600080fd5b8501601f810187136117c757600080fd5b6117d6878235602084016115bc565b91505092959194509250565b6000806000606084860312156117f757600080fd5b83359250611807602085016114f3565b9150604084013567ffffffffffffffff81111561182357600080fd5b61170586828701611614565b6000806040838503121561184257600080fd5b61184b836114f3565b9150611859602084016114f3565b90509250929050565b600181811c9082168061187657607f821691505b6020821081141561189757634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060001982141561192a5761192a611900565b5060010190565b66697066733a2f2f60c81b8152600060076000845481600182811c91508083168061195d57607f831692505b602080841082141561197d57634e487b7160e01b86526022600452602486fd5b81801561199157600181146119a6576119d7565b60ff1986168a890152848a01880196506119d7565b60008b81526020902060005b868110156119cd5781548c82018b01529085019083016119b2565b505087858b010196505b50949998505050505050505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611ab09083018461147a565b9695505050505050565b600060208284031215611acc57600080fd5b815161147381611440565b600082821015611ae957611ae9611900565b500390565b60008219821115611b0157611b01611900565b500190565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220c3ff881e63191173bafdef27aee0f74ae5ab9b807b696075e7b8b44344d7aa2a64736f6c634300080c0033";

type SimpleM4mNFTV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SimpleM4mNFTV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SimpleM4mNFTV2__factory extends ContractFactory {
  constructor(...args: SimpleM4mNFTV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "SimpleM4mNFTV2";
  }

  deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SimpleM4mNFTV2> {
    return super.deploy(
      name_,
      symbol_,
      overrides || {}
    ) as Promise<SimpleM4mNFTV2>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): SimpleM4mNFTV2 {
    return super.attach(address) as SimpleM4mNFTV2;
  }
  connect(signer: Signer): SimpleM4mNFTV2__factory {
    return super.connect(signer) as SimpleM4mNFTV2__factory;
  }
  static readonly contractName: "SimpleM4mNFTV2";
  public readonly contractName: "SimpleM4mNFTV2";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimpleM4mNFTV2Interface {
    return new utils.Interface(_abi) as SimpleM4mNFTV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleM4mNFTV2 {
    return new Contract(address, _abi, signerOrProvider) as SimpleM4mNFTV2;
  }
}
