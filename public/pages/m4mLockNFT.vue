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
import { handleLockComponents } from '@web3/mint';
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
      this.getWalletAddress();
    },
    getWalletAddress(){
      console.log('getWalletAddress start');
      $web3Ext.init('connectWallet', null, async (res) => {
        console.log('connectWallet result', res);
        if(res.err === 0){
          this.chainStore = Object.assign(this.chainStore, res.data);
          this.mint.owner = this.chainStore.userAddress;
          this.handleLockNFT();
        } else {
          if(res.data){
            showFailToast(res.data);
          } else {
            showFailToast('Unknown Error !');
          }
        }
      });
    },
    handleLockNFT(){
      console.log('handleLockNFT start');
      let inComponentIds = [], inAmounts = [];
      if(this.mint.params){
        let item;
        for(let i=0;i<this.mint.params.length;i++){
          item = this.mint.params[i];
          inComponentIds.push(item.tokenId);
          inAmounts.push(item.amount);
        }
        console.log('handleLockNFT for components !');
      }else{
        console.log('handleLockNFT for role !');
      }
      handleLockComponents(
        this.chainStore.provider,
        this.mint.targetContract,
        this.mint.m4mTokenId.toString(),
        this.mint.gameId,
        inComponentIds,
        inAmounts,
      ).then(res => {
        console.log('handleLockNFT general result', res);
        if(res){
          showSuccessToast('lock NFT Success !');
          this.mint.txId = res.transactionHash;
          this.handle();
        }else{
          showFailToast('lock NFT Failed !');
        }
      }).catch(res => {
        console.log('handleLockNFT catch error', res);
      });
    },
    handle(){
      let obj = { guid: this.mint.guid, txId: this.mint.txId, t: new Date().valueOf() }
      window.location.href = 'uniwebview://lock'+this.$$.Obj2String(obj);
    },
  },
};
</script>
