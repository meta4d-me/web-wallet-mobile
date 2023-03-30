/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "IERC1271Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1271Upgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "ERC1155Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155Upgradeable__factory>;
    getContractFactory(
      name: "IERC1155MetadataURIUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155MetadataURIUpgradeable__factory>;
    getContractFactory(
      name: "IERC1155ReceiverUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155ReceiverUpgradeable__factory>;
    getContractFactory(
      name: "IERC1155Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Upgradeable__factory>;
    getContractFactory(
      name: "ERC1155HolderUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155HolderUpgradeable__factory>;
    getContractFactory(
      name: "ERC1155ReceiverUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155ReceiverUpgradeable__factory>;
    getContractFactory(
      name: "ERC721Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Upgradeable__factory>;
    getContractFactory(
      name: "ERC721EnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721EnumerableUpgradeable__factory>;
    getContractFactory(
      name: "IERC721EnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721EnumerableUpgradeable__factory>;
    getContractFactory(
      name: "IERC721MetadataUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721MetadataUpgradeable__factory>;
    getContractFactory(
      name: "IERC721ReceiverUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721ReceiverUpgradeable__factory>;
    getContractFactory(
      name: "IERC721Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Upgradeable__factory>;
    getContractFactory(
      name: "ERC721HolderUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721HolderUpgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IERC1155Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Receiver__factory>;
    getContractFactory(
      name: "ERC1155Holder",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155Holder__factory>;
    getContractFactory(
      name: "ERC1155Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155Receiver__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Enumerable__factory>;
    getContractFactory(
      name: "IERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Enumerable__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC721Holder",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Holder__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IM4mBaggage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IM4mBaggage__factory>;
    getContractFactory(
      name: "IM4mBaggageWithoutRole",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IM4mBaggageWithoutRole__factory>;
    getContractFactory(
      name: "IM4mComponents",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IM4mComponents__factory>;
    getContractFactory(
      name: "IM4mComponentsV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IM4mComponentsV2__factory>;
    getContractFactory(
      name: "IM4mDAO",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IM4mDAO__factory>;
    getContractFactory(
      name: "IM4mNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IM4mNFT__factory>;
    getContractFactory(
      name: "IM4mNFTRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IM4mNFTRegistry__factory>;
    getContractFactory(
      name: "IM4mNFTRegistryV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IM4mNFTRegistryV2__factory>;
    getContractFactory(
      name: "IManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IManager__factory>;
    getContractFactory(
      name: "IManagerV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IManagerV2__factory>;
    getContractFactory(
      name: "M4mBaggage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.M4mBaggage__factory>;
    getContractFactory(
      name: "M4mBaggageWithoutRole",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.M4mBaggageWithoutRole__factory>;
    getContractFactory(
      name: "M4mComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.M4mComponent__factory>;
    getContractFactory(
      name: "M4mComponentV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.M4mComponentV2__factory>;
    getContractFactory(
      name: "M4mDao",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.M4mDao__factory>;
    getContractFactory(
      name: "M4mNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.M4mNFT__factory>;
    getContractFactory(
      name: "M4mNFTRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.M4mNFTRegistry__factory>;
    getContractFactory(
      name: "M4mNFTRegistryV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.M4mNFTRegistryV2__factory>;
    getContractFactory(
      name: "SimpleM4mNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SimpleM4mNFT__factory>;
    getContractFactory(
      name: "SimpleM4mNFTV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SimpleM4mNFTV2__factory>;
    getContractFactory(
      name: "Manager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Manager__factory>;
    getContractFactory(
      name: "ManagerV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ManagerV2__factory>;
    getContractFactory(
      name: "Zip",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Zip__factory>;
    getContractFactory(
      name: "ZipV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ZipV2__factory>;

    getContractAt(
      name: "OwnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "IERC1271Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1271Upgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "ERC1155Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155Upgradeable>;
    getContractAt(
      name: "IERC1155MetadataURIUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155MetadataURIUpgradeable>;
    getContractAt(
      name: "IERC1155ReceiverUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155ReceiverUpgradeable>;
    getContractAt(
      name: "IERC1155Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Upgradeable>;
    getContractAt(
      name: "ERC1155HolderUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155HolderUpgradeable>;
    getContractAt(
      name: "ERC1155ReceiverUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155ReceiverUpgradeable>;
    getContractAt(
      name: "ERC721Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Upgradeable>;
    getContractAt(
      name: "ERC721EnumerableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721EnumerableUpgradeable>;
    getContractAt(
      name: "IERC721EnumerableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721EnumerableUpgradeable>;
    getContractAt(
      name: "IERC721MetadataUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721MetadataUpgradeable>;
    getContractAt(
      name: "IERC721ReceiverUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721ReceiverUpgradeable>;
    getContractAt(
      name: "IERC721Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Upgradeable>;
    getContractAt(
      name: "ERC721HolderUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721HolderUpgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "ERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165Upgradeable>;
    getContractAt(
      name: "IERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165Upgradeable>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IERC1155Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Receiver>;
    getContractAt(
      name: "ERC1155Holder",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155Holder>;
    getContractAt(
      name: "ERC1155Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155Receiver>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721Enumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Enumerable>;
    getContractAt(
      name: "IERC721Enumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Enumerable>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC721Holder",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Holder>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IM4mBaggage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IM4mBaggage>;
    getContractAt(
      name: "IM4mBaggageWithoutRole",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IM4mBaggageWithoutRole>;
    getContractAt(
      name: "IM4mComponents",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IM4mComponents>;
    getContractAt(
      name: "IM4mComponentsV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IM4mComponentsV2>;
    getContractAt(
      name: "IM4mDAO",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IM4mDAO>;
    getContractAt(
      name: "IM4mNFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IM4mNFT>;
    getContractAt(
      name: "IM4mNFTRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IM4mNFTRegistry>;
    getContractAt(
      name: "IM4mNFTRegistryV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IM4mNFTRegistryV2>;
    getContractAt(
      name: "IManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IManager>;
    getContractAt(
      name: "IManagerV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IManagerV2>;
    getContractAt(
      name: "M4mBaggage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.M4mBaggage>;
    getContractAt(
      name: "M4mBaggageWithoutRole",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.M4mBaggageWithoutRole>;
    getContractAt(
      name: "M4mComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.M4mComponent>;
    getContractAt(
      name: "M4mComponentV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.M4mComponentV2>;
    getContractAt(
      name: "M4mDao",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.M4mDao>;
    getContractAt(
      name: "M4mNFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.M4mNFT>;
    getContractAt(
      name: "M4mNFTRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.M4mNFTRegistry>;
    getContractAt(
      name: "M4mNFTRegistryV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.M4mNFTRegistryV2>;
    getContractAt(
      name: "SimpleM4mNFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SimpleM4mNFT>;
    getContractAt(
      name: "SimpleM4mNFTV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SimpleM4mNFTV2>;
    getContractAt(
      name: "Manager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Manager>;
    getContractAt(
      name: "ManagerV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ManagerV2>;
    getContractAt(
      name: "Zip",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Zip>;
    getContractAt(
      name: "ZipV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ZipV2>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
