<template>
  <div class="m4mMint">
    <van-button plain type="success" @click="getParams">
      start for get game params
    </van-button>
    <template v-if="mint && mint.m4mTokenId">
      <p style="margin:20px 0; border:1px solid #f00; padding:15px;word-break: break-all;">
        game params: {{ mint }}
      </p>
      <van-button plain type="primary" @click="getWalletAddress()">
        start lock role
      </van-button>
      <br>
      <van-button plain type="danger" @click="handle">
        callBack to game
      </van-button>
    </template>
  </div>
  <load-steps ref="stepRef" @callBack="handle"></load-steps>
</template>

<script>
import { handleLockComponents, isApprovalForAll, setApprovalForAll } from '@web3/mint';
import $web3Ext from '@web3/web3.extend';
import { showFailToast, showSuccessToast } from 'vant';
import loadSteps from '@/components/loadSteps';
export default {
  name: 'M4mUnlockNFT',
  components: { loadSteps },
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
      steps: {
        select: 0,
        list: [
          { step: 1, label: 'get params ' },
          { step: 2, label: 'connect Wallet. ' },
          { step: 3, label: 'check approval status ' },
          { step: 4, label: 'approval ' },
          { step: 5, label: 'Lock Role ' },
        ],
        show: false,
        error: 0,
      },
    };
  },
  created(){
  },
  mounted(){
    this.$root.loading(false);
    this.$refs.stepRef.steps = this.steps;
    //this.getParams();
  },
  methods: {
    getParams(){
      this.$refs.stepRef.steps.show = true;
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
      this.$refs.stepRef.steps.select = 1;
      $web3Ext.init('connectWallet', null, async (res) => {
        console.log('connectWallet result', res);
        if(res.err === 0){
          this.chainStore = Object.assign(this.chainStore, res.data);
          this.mint.owner = this.chainStore.userAddress;
          this.handleIsApprovalForAll();
        } else {
          let msg = res.data || 'Connect Wallet Error !';
          showFailToast(msg);
          this.$$.loadStepsErr(this, 1,msg);
        }
      });
    },
    handleIsApprovalForAll(){
      console.log('handleIsApprovalForAll start');
      this.$refs.stepRef.steps.select = 2;
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
        this.$$.loadStepsErr(this, 2,'error !');
        console.log('handleSetApprovalForAll catch error', res);
      });
    },
    handleSetApprovalForAll(){
      console.log('handleSetApprovalForAll start');
      this.$refs.stepRef.steps.select = 3;
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
          this.$$.loadStepsErr(this, 3,'error !');
        }
      }).catch(res => {
        this.$$.loadStepsErr(this, 3,'error !');
        console.log('handleSetApprovalForAll catch error', res);
      });
    },
    handleLockRole(){
      console.log('handleLockRole start');
      this.$refs.stepRef.steps.select = 4;
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
          //this.handle();
          this.$refs.stepRef.steps.select = 5;
        }else{
          showFailToast('Lock Role Failed !');
          this.$$.loadStepsErr(this, 4,'error !');
        }
      }).catch(res => {
        res = res.toLocaleString();
        this.$$.loadStepsErr(this, 4,'Failed !'+ res.substring(res.indexOf(':')+1, res.indexOf(';')));
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
