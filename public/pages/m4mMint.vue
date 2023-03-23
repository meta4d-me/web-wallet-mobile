<template>
  <div class="m4mMint">
    <van-button plain type="success" @click="getParams">
      点击这里，开始获取unity传入参数
    </van-button>
    <template v-if="mint && mint.m4mTokenId">
      <p style="margin:20px 0; border:1px solid #f00; padding:15px;word-break: break-all;">
        unity传入参数：{{ mint }}
      </p>
      <van-button plain type="primary" @click="getWalletAddress()">
        开始mint
      </van-button>
      <br>
      <van-button plain type="danger" @click="handle">
        点击回传参数给unity
      </van-button>
    </template>
  </div>
</template>

<script>
import { isApprovalForAll, setApprovalForAll, handleGameEnd, handleUnlockComponents, handleLockComponents } from '@web3/mint';
import $web3Ext from '@web3/web3.extend';
import { showFailToast, showSuccessToast } from 'vant';
export default {
  name: 'M4mMint',
  data() {
    return {
      mint: {
        gameSignerSig: '',
        guid: '',
        nonce: null,
        params: null,  //"{\n\t\"m4m_token_id\" : \"399712059115176241\",\n\t\"nonce\" : 1,\n\t\"params\" : [\n\t\t{\n\t\t\t\"tokenId\" : 531003800,\n\t\t\t\"prepare\" : true,\n\t\t\t\"name\" : \"fashionName\",\n\t\t\t\"symbol\" : \"fashionName\",\n\t\t\t\"amount\" : 1\n\t\t}\n\t]\n}"
        m4mTokenId: '',
        operatorSig: '',
        owner: '', // 用户walletAddress,
        signHash: '', // 签名哈希
        gameId: this.$$.apiURLS.appId,
        nftContract: this.$$.apiURLS.nftContract,
        targetContract: this.$$.apiURLS.targetContract,
        ERCType: this.$$.apiURLS.ERCType,
      },
      chainStore: {
        chainId: null,
        connected: false,
        networkId: null,
        provider: {},
        userAddress: '', // 钱包地址
        walletSignature: '', // 获取到的签名
        urlSign: '', // url签名
      },
    };
  },
  created(){
  },
  mounted(){

  },
  methods: {
    getParams(){
      let query = {};
      query = this.$route.query;
      if(JSON.stringify(query) === '{}'){
        let url = 'https://aradpay.gamewonderlab.io/#/mint?gameSign=0x538b3f2f82fc69a20881a235556379b32bc70baa5946b4de96e407e923121ba734a18341c00354cb85bab5f670116b1d96e21e871c1ea68bc833478d4f5828291b&guid=403072166649662735&nonce=3435973836&params=%7b%0a%09%22m4m_token_id%22%20%3a%20%22399712059115176241%22%2c%0a%09%22nonce%22%20%3a%201%2c%0a%09%22params%22%20%3a%20%5b%0a%09%09%7b%0a%09%09%09%22tokenId%22%20%3a%20531003800%2c%0a%09%09%09%22prepare%22%20%3a%20true%2c%0a%09%09%09%22name%22%20%3a%20%22fashionName%22%2c%0a%09%09%09%22symbol%22%20%3a%20%22fashionName%22%2c%0a%09%09%09%22amount%22%20%3a%201%0a%09%09%7d%0a%09%5d%0a%7d&tokenId=399712059115176241';
        query = this.$$.getURLParam({}, url);
      }
      /**gameSign, guid, nonce, params, tokenId**/
      console.log(query);
      this.mint.m4mTokenId = query.tokenId;
      this.mint.params = JSON.parse(query.params);
      this.mint.nonce = Number(this.mint.params.nonce);
      this.mint.params = this.mint.params.params;
      this.mint.gameSignerSig = query.gameSign;
      this.mint.operatorSig = Buffer.from('');
      this.mint.guid = query.guid;
      console.log(this.mint);
    },
    getWalletAddress(){
      //showFailToast('未知错误！');
      $web3Ext.init('connectWallet', null, async (res) => {
        console.log(res)
        if(res.err === 0){
          this.chainStore = Object.assign(this.chainStore, res.data);
          this.mint.owner = this.chainStore.userAddress;
          //this.handleLockNFT();
          this.handleMintInit();
        } else {
          if(res.data){
            showFailToast(res.data);
          } else {
            showFailToast('Unknown Error !');
          }
        }
      });
    },
    handleMintInit(){
      /**mint流程
       * 先判断用户是否已经Approve签约授权
       * 然后lock这个tokenId
       * 最后执行mint
       **/
      /**这里可以做二次代码修改**/
      isApprovalForAll(
        this.chainStore.provider,
        this.mint.ERCType,
        this.mint.owner,
        this.mint.nftContract,
        this.mint.targetContract,
      ).then(res => {
        console.log('isApprovalForAll', res)
        if(res && typeof res === 'boolean' && JSON.stringify(res) === 'true'){
          this.handleLockNFT();
        }else{
          this.handleSetApprovalForAll();
        }
      });
    },
    handleSetApprovalForAll(){
      setApprovalForAll(
        this.chainStore.provider,
        this.mint.ERCType,
        this.mint.owner,
        this.mint.nftContract,
        this.mint.targetContract,
      ).then(res => {
        if(res && res.transactionHash){
          this.handleLockNFT();
        }else{
          showFailToast('User Sign-up Failed !');
        }
      });
    },
    handleLockNFT(){
      console.log('handleLockNFT');
      handleLockComponents(
        this.chainStore.provider,
        this.mint.targetContract,
        this.mint.m4mTokenId.toString(),
        this.mint.gameId,
        [],
        [],
      ).then(res => {
        console.log('handleLockNFT最后一步result', res);
        if(res){
          this.handleMintResult();
        }else{
          showFailToast('Clock NFT Failed !');
        }
      });
    },
    handleUnlockNFT(){
      console.log('handleUnlockNFT');
      handleUnlockComponents(
        this.chainStore.provider,
        this.mint.targetContract,
        this.mint.m4mTokenId.toString(),
        this.mint.nonce,
        [],
        this.mint.operatorSig,
        this.mint.gameSignerSig,
      ).then(res => {
        console.log('handleUnlockNFT最后一步result', res);
        if(res){
          showSuccessToast('Unlock NFT success !');
        }
      });
    },
    handleMintResult(){
      console.log('handleMintResult');
      handleGameEnd(
        this.chainStore.provider,
        this.mint.targetContract,
        this.mint.m4mTokenId.toString(),
        this.mint.nonce,
        this.mint.params,
        this.mint.operatorSig,
        this.mint.gameSignerSig,
      ).then(res => {
        console.log('handleGameEnd最后一步result', res);
      });
    },
    handle(){
      let obj = { ...this.query, t: new Date().valueOf() }
      window.location.href = 'uniwebview://mint'+this.$$.Obj2String(obj);
    },
  },
};
</script>
