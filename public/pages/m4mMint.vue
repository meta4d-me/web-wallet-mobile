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
        start mint
      </van-button>
      <br>
      <van-button plain type="danger" @click="handle">
        callBack to game
      </van-button>
    </template>
  </div>
  <load-steps ref="stepRef" @callBack="handle" />
</template>

<script>
import { isApprovalForAll, setApprovalForAll, handleSettleNewLoots, getGameSignerHash, getLocalGameSignerSig, handleLockRoleNFT } from '@web3/mint';
import $web3Ext from '@web3/web3.extend';
import { showFailToast, showSuccessToast } from 'vant';
import loadSteps from '@/components/loadSteps';
export default {
  name: 'M4mMint',
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
        txId: '', // mint成功以后的哈希地址
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
          { step: 6, label: 'Mint NFT ' },
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
    if(process.env.prod === 'prod'){
      this.getParams();
    }
  },
  methods: {
    getParams(){
      this.$refs.stepRef.steps.show = true;
      let query = {};
      query = this.$route.query;
      if(JSON.stringify(query) === '{}'){
        let url = 'https://aradpay.gamewonderlab.io/#/mint?gameSign=0x5fc60e3b729078c839b632170a7a7a95a79ef5e6923b39f5cbb396b72c540c1a04dc4438358d7e1aba2812216a79a5c5f30bc23d423b1c84d4161c5aa82d9bd21b&guid=401963858928873894&nonce=1&params=%7b%22nonce%22%3a%201%2c%20%22params%22%3a%20%5b%7b%22name%22%3a%20%22fashionName%22%2c%20%22amount%22%3a%201%2c%20%22symbol%22%3a%20%22fashionName%22%2c%20%22prepare%22%3a%20true%2c%20%22tokenId%22%3a%20%22401963858928872084%22%7d%5d%2c%20%22m4m_token_id%22%3a%20%22399712059115176343%22%7d&tokenId=399712059115176343';
        query = this.$$.getURLParam({}, url);
      }
      /**gameSign, guid, nonce, params, tokenId**/
      console.log('url query 参数', query);
      this.mint.m4mTokenId = query.tokenId || query.m4mTokenId;
      this.mint.params = query.params && JSON.parse(query.params) || '';
      this.mint.nonce = this.mint.params && Number(this.mint.params.nonce) || '';
      this.mint.params = this.mint.params && this.mint.params.params || '';
      this.mint.gameSignerSig = query.gameSign;
      this.mint.operatorSig = Buffer.from('');
      this.mint.guid = query.guid;
      console.log('this.mint', this.mint);
      if(process.env.prod === 'prod'){
        this.getWalletAddress();
      }else{
        this.handleGetGameSignerHash();
      }
    },
    handleGetGameSignerHash(){
      getGameSignerHash(
        this.mint.params,
        this.mint.m4mTokenId,
        this.mint.gameId,
        this.mint.nonce,
      ).then(res => {
        this.handleGetLocalGameSignerSig(res);
      }).catch(() => {
        if(process.env.prod === 'prod'){
          window.location.href = 'uniwebview://close?t='+new Date().valueOf();
        }
      });
    },
    handleGetLocalGameSignerSig(hash){
      getLocalGameSignerSig(
        hash,
        '9c242f13f94872bda353270957f72bb7a1e4c71e3e9b5d174ad0684ffe6b62f0',
      ).then(res => {
        if(res !== this.mint.gameSignerSig){
          showFailToast('Signature May Be Incorrect !');
        }else{
          showSuccessToast('Signature Verification Passed !');
        }
        this.getWalletAddress();
      }).catch(() => {
        if(process.env.prod === 'prod'){
          window.location.href = 'uniwebview://close?t='+new Date().valueOf();
        }
      });
    },
    getWalletAddress(){
      this.$refs.stepRef.steps.select = 1;
      console.log('getWalletAddress start');
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
          if(process.env.prod === 'prod'){
            window.location.href = 'uniwebview://close?route=mint&step=1&t='+new Date().valueOf()+'&error='+msg;
          }
        }
      });
    },
    handleIsApprovalForAll(){
      /**mint流程
       * 先判断用户是否已经Approve签约授权
       * 然后执行mint
       **/
      this.$refs.stepRef.steps.select = 2;
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
        this.$$.loadStepsErr(this, 2,'error !');
        console.log('handleIsApprovalForAll catch error', res);
        if(process.env.prod === 'prod'){
          window.location.href = 'uniwebview://close?route=mint&step=2&t='+new Date().valueOf()+'&error=handleIsApprovalForAll catch error, '+res.toString();
        }
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
          if(process.env.prod === 'prod'){
            window.location.href = 'uniwebview://close?route=mint&step=3&t='+new Date().valueOf()+'&error=User Approval Failed !';
          }
        }
      }).catch(res => {
        this.$$.loadStepsErr(this, 3,'error !');
        console.log('handleSetApprovalForAll catch error', res);
        if(process.env.prod === 'prod'){
          window.location.href = 'uniwebview://close?route=mint&step=3&t='+new Date().valueOf()+'&error=handleSetApprovalForAll catch error, '+res.toString();
        }
      });
    },
    handleLockRole(){
      console.log('handleLockRole start');
      this.$refs.stepRef.steps.select = 4;
      handleLockRoleNFT(
        this.chainStore.provider,
        this.mint.targetContract,
        this.mint.m4mTokenId.toString(),
        this.mint.gameId,
        [],
        [],
      ).then(res => {
        console.log('handleLockRole general result', res);
        if(res){
          this.handleMintResult();
        }else{
          showFailToast('Lock Role Failed !');
          this.$$.loadStepsErr(this, 4,'Failed !');
          if(process.env.prod === 'prod'){
            window.location.href = 'uniwebview://close?route=mint&step=4&t='+new Date().valueOf()+'&msg=Lock Role Failed !';
          }
        }
      }).catch(res => {
        this.$$.loadStepsErr(this, 4,'error !');
        console.log('handleLockRole catch error', res);
        if(process.env.prod === 'prod'){
          window.location.href = 'uniwebview://close?route=mint&step=4&t='+new Date().valueOf()+'&msg=handleLockRole catch error, '+res.toString();
        }
      });
    },
    handleMintResult(){
      console.log('handleMintResult start');
      this.$refs.stepRef.steps.select = 5;
      handleSettleNewLoots(
        this.chainStore.provider,
        this.mint.targetContract,
        this.mint.m4mTokenId.toString(),
        this.mint.nonce,
        this.mint.params,
        this.mint.operatorSig,
        this.mint.gameSignerSig,
      ).then(res => {
        console.log('handleMintResult general result', res);
        if(res){
          showSuccessToast('Mint NFT Success !');
          this.mint.txId = res.transactionHash;
          this.$refs.stepRef.steps.select = 6;
          if(process.env.prod === 'prod'){
            this.handle();
          }
        }else{
          showFailToast('Mint NFT Failed !');
          this.$$.loadStepsErr(this, 5,'Failed !');
          if(process.env.prod === 'prod'){
            window.location.href = 'uniwebview://close?route=mint&step=5&t='+new Date().valueOf()+'&msg=Mint NFT Failed !';
          }
        }
      }).catch(res => {
        this.$$.loadStepsErr(this, 5,'error !');
        console.log('handleMintResult catch error', res);
        if(process.env.prod === 'prod'){
          window.location.href = 'uniwebview://close?route=mint&step=5&t='+new Date().valueOf()+'&msg=handleMintResult catch error, '+res.toString();
        }
      });
    },
    handle(){
      setTimeout(() => {
        let obj = { guid: this.mint.guid, txId: this.mint.txId, t: new Date().valueOf() }
        window.location.href = 'uniwebview://mint'+this.$$.Obj2String(obj);
      }, 2000);
    },
  },
};
</script>
