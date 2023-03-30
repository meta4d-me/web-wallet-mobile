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
        start unlock
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
import { handleUnlockComponents } from '@web3/mint';
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
        list: [{ step: 1, label: 'get params ' },
          { step: 2, label: 'connect Wallet. ' },
          { step: 3, label: 'unlock NFT ' }],
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
        let url = 'https://aradpay.gamewonderlab.io/#/unlock?gameSign=&guid=401963858928879058&nonce=3435973836&params=%7b%0a%09%22m4m_token_id%22%20%3a%20%22399712059115176447%22%2c%0a%09%22nonce%22%20%3a%201%2c%0a%09%out_component_ids%22%20%3a%20%5b%0a%09%09401963858928877696%0a%09%5d%0a%7d&tokenId=399712059115176447';
        query = this.$$.getURLParam({}, url);
      }
      /**gameSign, guid, nonce, params, tokenId**/
      console.log('url query 参数', query);
      this.mint.m4mTokenId = query.tokenId || query.m4mTokenId;
      this.mint.params = query.params && JSON.parse(query.params) || '';
      this.mint.nonce = this.mint.params && Number(this.mint.params.nonce) || '';
      this.mint.params = this.mint.params && this.mint.params['out_component_ids'] || '';
      this.mint.gameSignerSig = query.gameSign;
      this.mint.operatorSig = Buffer.from('');
      this.mint.guid = query.guid;
      console.log(this.mint);
      this.getWalletAddress();
    },
    getWalletAddress(){
      console.log('getWalletAddress start');
      this.$refs.stepRef.steps.select = 1;
      $web3Ext.init('connectWallet', null, async (res) => {
        console.log(res)
        if(res.err === 0){
          this.chainStore = Object.assign(this.chainStore, res.data);
          this.mint.owner = this.chainStore.userAddress;
          this.handleUnlockNFT();
        } else {
          let msg = res.data || 'Connect Wallet Error !';
          showFailToast(msg);
          this.$$.loadStepsErr(this, 1,msg);
          if(process.env.prod === 'prod'){
            window.location.href = 'uniwebview://close?route=UnlockNFT&step=1&t='+new Date().valueOf()+'&error='+msg;
          }
        }
      });
    },
    handleUnlockNFT(){
      console.log('handleUnlockNFT start');
      this.$refs.stepRef.steps.select = 2;
      let componentIds = [], amountIds = [];
      if(this.mint.params){
        for(let i=0;i<this.mint.params.length;i++){
          componentIds.push(this.mint.params[i]);
          amountIds.push(1);
        }
        console.log('handleUnlockNFT for components !');
      }else{
        console.log('handleUnlockNFT for role !');
      }
      handleUnlockComponents(
        this.chainStore.provider,
        this.mint.targetContract,
        this.mint.m4mTokenId.toString(),
        this.mint.nonce,
        componentIds, // lootIds
        amountIds, // lootAmounts
        componentIds, // lostIds
        amountIds, // lostAmounts
        this.mint.operatorSig,
        this.mint.gameSignerSig,
      ).then(res => {
        console.log('handleUnlockNFT general result', res);
        if(res){
          showSuccessToast('Unlock NFT Success !');
          this.mint.txId = res.transactionHash;
          this.$refs.stepRef.steps.select = 3;
          if(process.env.prod === 'prod'){
            this.handle();
          }
        }else{
          showFailToast('Unlock NFT Failed !');
          this.$$.loadStepsErr(this, 2,'Failed !');
          if(process.env.prod === 'prod'){
            window.location.href = 'uniwebview://close?route=UnlockNFT&step=2&t='+new Date().valueOf()+'&error=general result Unlock NFT Failed !';
          }
        }
      }).catch(res => {
        res = res.toLocaleString();
        this.$$.loadStepsErr(this, 2,'Failed ! '+ res.substring(res.indexOf(':')+1, res.indexOf('(')));
        console.log('handleUnlockNFT catch error', res);
        if(process.env.prod === 'prod'){
          window.location.href = 'uniwebview://close?route=UnlockNFT&step=2&t='+new Date().valueOf()+'&error=handleUnlockNFT catch error, '+res;
        }
      });
    },
    handle(){
      setTimeout(() => {
        let obj = { guid: this.mint.guid, txId: this.mint.txId, t: new Date().valueOf() }
        window.location.href = 'uniwebview://unlock'+this.$$.Obj2String(obj);
      }, 2000);
    },
  },
};
</script>
