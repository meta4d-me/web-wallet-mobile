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
        开始lock
      </van-button>
      <br>
      <van-button plain type="danger" @click="handle">
        点击回传参数给unity
      </van-button>
    </template>
  </div>
</template>

<script>
import { handleLockComponents, isApprovalForAll, setApprovalForAll } from '@web3/mint';
import $web3Ext from '@web3/web3.extend';
import { showFailToast, showSuccessToast } from 'vant';
export default {
  name: 'M4mUnlockNFT',
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
        txId: '',
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
    this.$root.loading(false);
    this.getParams();
  },
  methods: {
    getParams(){
      let query = {};
      query = this.$route.query;
      if(JSON.stringify(query) === '{}'){
        let url = 'https://aradpay.gamewonderlab.io/#/mint?m4mTokenId=399712059115176343';
        query = this.$$.getURLParam({}, url);
      }
      /**gameSign, guid, nonce, params, tokenId**/
      console.log('url query 参数', query);
      this.mint.m4mTokenId = query.tokenId || query.m4mTokenId;
      console.log('this.mint', this.mint);
      this.getWalletAddress();
    },
    getWalletAddress(){
      console.log('getWalletAddress start');
      $web3Ext.init('connectWallet', null, async (res) => {
        console.log('connectWallet result', res);
        if(res.err === 0){
          this.chainStore = Object.assign(this.chainStore, res.data);
          this.mint.owner = this.chainStore.userAddress;
          this.handleIsApprovalForAll();
        } else {
          if(res.data){
            showFailToast(res.data);
          } else {
            showFailToast('connectWallet Error !');
          }
        }
      });
    },
    handleIsApprovalForAll(){
      console.log('handleIsApprovalForAll start');
      isApprovalForAll(
        this.chainStore.provider,
        this.mint.ERCType,
        this.mint.owner,
        this.mint.nftContract,
        this.mint.targetContract,
      ).then(res => {
        console.log('handleIsApprovalForAll general result', res)
        if(res && typeof res === 'boolean' && JSON.stringify(res) === 'true'){
          this.handleLockRole();
        }else{
          this.handleSetApprovalForAll();
        }
      }).catch(res => {
        console.log('handleIsApprovalForAll catch error', res);
      });
    },
    handleSetApprovalForAll(){
      console.log('handleSetApprovalForAll start');
      setApprovalForAll(
        this.chainStore.provider,
        this.mint.ERCType,
        this.mint.owner,
        this.mint.nftContract,
        this.mint.targetContract,
      ).then(res => {
        console.log('handleSetApprovalForAll general result', res)
        if(res && res.transactionHash){
          this.handleLockRole();
        }else{
          showFailToast('User Approval Failed !');
        }
      }).catch(res => {
        console.log('handleSetApprovalForAll catch error', res);
      });
    },
    handleLockRole(){
      console.log('handleLockRole start');
      handleLockComponents(
        this.chainStore.provider,
        this.mint.targetContract,
        this.mint.m4mTokenId.toString(),
        this.mint.gameId,
        [],
        [],
      ).then(res => {
        console.log('handleLockRole general result', res);
        if(res){
          showSuccessToast('Lock Role Success !');
          this.handle();
        }else{
          showFailToast('Lock Role Failed !');
        }
      }).catch(res => {
        console.log('handleLockRole catch error', res);
      });
    },
    handle(){
      let obj = { success: 1, t: new Date().valueOf() }
      window.location.href = 'uniwebview://lockRole'+this.$$.Obj2String(obj);
    },
  },
};
</script>
