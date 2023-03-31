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
import { handleUnlockComponents, getUnlockGameSignerHash, getLocalGameSignerSig } from '@web3/mint';
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
        'loot_ids': [],
        'lost_ids': [],
        'loot_amounts': [],
        'lost_amounts': [],
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
        let url = 'http://127.0.0.1:9010/#/unlock?gameSign=0x395e2ea834104e535c71d5b9ac2c780f0bd0471292054945c1db65b840ad6a2e0dff4bbe91496d27337bdf861e32f2f701503b61f6c76cc6678be24e628100701c&guid=401963858928891262&nonce=1&params={"nonce": 1, "gameId": 1, "loot_ids": ["401963858928886705"], "lost_ids": ["401963858928886705"], "loot_amounts": [1], "lost_amounts": [1], "m4m_token_id": "399712059115176656"}&tokenId=399712059115176656';
        query = this.$$.getURLParam({}, url);
      }
      /**gameSign, guid, nonce, params, tokenId**/
      console.log('url query 参数', query);
      this.mint.m4mTokenId = query.tokenId || query.m4mTokenId;
      this.mint.params = query.params && JSON.parse(query.params) || '';
      this.mint.nonce = this.mint.params && Number(this.mint.params.nonce) || '';
      this.mint['loot_ids'] = this.mint.params && this.mint.params['loot_ids'] || '';
      this.mint['loot_amounts'] = this.mint.params && this.mint.params['loot_amounts'] || '';
      this.mint['lost_ids'] = this.mint.params && this.mint.params['lost_ids'] || '';
      this.mint['lost_amounts'] = this.mint.params && this.mint.params['lost_amounts'] || '';
      this.mint.gameSignerSig = query.gameSign;
      this.mint.operatorSig = Buffer.from('');
      this.mint.guid = query.guid;
      console.log(this.mint);
      debugger
      if(process.env.prod === 'prod'){
        this.getWalletAddress();
      }else{
        this.handleGetGameSignerHash();
      }
    },
    handleGetGameSignerHash(){
      getUnlockGameSignerHash(
        this.mint.m4mTokenId.toString(),
        this.mint.gameId,
        this.mint.nonce,
        this.mint['loot_ids'], // lootIds
        this.mint['loot_amounts'], // lootAmounts
        this.mint['lost_ids'], // lostIds
        this.mint['lost_amounts'], // lostAmounts
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
        console.log('handleGetLocalGameSignerSig', res);
        if(res !== this.mint.gameSignerSig){
          this.mint.gameSignerSig = res;
          showFailToast('Signature May Be Incorrect !');
        }else{
          console.log('handleGetLocalGameSignerSig', 'same as the game Signature');
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
        this.mint['loot_ids'], // lootIds
        this.mint['loot_amounts'], // lootAmounts
        this.mint['lost_ids'], // lostIds
        this.mint['lost_amounts'], // lostAmounts
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
        let msg = 'Failed ! ';
        if(res.error && res.error.code && res.error.data && res.error.message){
          msg += 'error:{ code:'+ res.error.code+', msg:'+ res.error.message+' '+res.error.data.message+'}'
        }else{
          res = res.toLocaleString();
          msg += res.substring(res.indexOf(':')+1, res.indexOf('('));
        }
        debugger
        this.$$.loadStepsErr(this, 2,msg);
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
