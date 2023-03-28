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
        start lock nft
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
import { handleLockComponents } from '@web3/mint';
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
          { step: 3, label: 'Lock NFT ' },
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
        //let url = 'https://aradpay.gamewonderlab.io/#/lock?gameSign=&guid=401963858928879058&nonce=3435973836&params=%7b%0a%09%22m4m_token_id%22%20%3a%20%22399712059115176447%22%2c%0a%09%22nonce%22%20%3a%201%2c%0a%09%22component_ids%22%20%3a%20%5b%0a%09%09401963858928877696%0a%09%5d%0a%7d&tokenId=399712059115176447';
        let url = 'https://aradpay.gamewonderlab.io/#/lock?gameSign=&guid=401963858928887106&nonce=3435973836&params=%7b%0a%09%22m4m_token_id%22%20%3a%20%22399712059115176545%22%2c%0a%09%22nonce%22%20%3a%202%2c%0a%09%22component_ids%22%20%3a%20%5b%0a%09%09%22401963858928886705%22%0a%09%5d%0a%7d&tokenId=399712059115176545';
        //url = 'https%3A%2F%2Faradpay.gamewonderlab.io%2F%23%2Flock%3FgameSign%3D%26guid%3D401963858928885716%26nonce%3D2%26params%3D%7B%22m4m_token_id%22%20%3A%20%22399712059115176449%22%2C%22nonce%22%20%3A%202%2C%22component_ids%22%20%3A%20%5B%22401963858928885716%22%5D%7D%26tokenId%3D401963858928885716'
        query = this.$$.getURLParam({}, url);
      }
      /**gameSign, guid, nonce, params, tokenId**/
      console.log('url query 参数', query);
      this.mint.m4mTokenId = query.tokenId || query.m4mTokenId;
      this.mint.params = query.params && JSON.parse(query.params) || '';
      this.mint.nonce = this.mint.params && Number(this.mint.params.nonce) || '';
      this.mint.params = this.mint.params && this.mint.params['component_ids'] || '';
      this.mint.gameSignerSig = query.gameSign;
      this.mint.operatorSig = Buffer.from('');
      this.mint.guid = query.guid;
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
          this.handleLockNFT();
        } else {
          let msg = res.data || 'Connect Wallet Error !';
          showFailToast(msg);
          this.$$.loadStepsErr(this, 1,msg);
        }
      });
    },
    handleLockNFT(){
      console.log('handleLockNFT start');
      this.$refs.stepRef.steps.select = 2;
      let inComponentIds = [], inAmounts = [];
      if(this.mint.params){
        let item;
        for(let i=0;i<this.mint.params.length;i++){
          item = this.mint.params[i];
          inComponentIds.push(item.toString());
          inAmounts.push(1);
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
          this.$refs.stepRef.steps.select = 3;
          //this.handle();
        }else{
          showFailToast('lock NFT Failed !');
          this.$$.loadStepsErr(this, 2,'Failed !');
        }
      }).catch(res => {
        res = res.toLocaleString();
        this.$$.loadStepsErr(this, 2,'Failed !'+ res.substring(res.indexOf(':')+1, res.indexOf(';')));
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
