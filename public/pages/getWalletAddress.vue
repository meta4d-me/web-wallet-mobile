<template>
  <div class="getWalletAddress">
    <van-button plain type="success" @click="getWalletAddress" v-if="!chainStore || !chainStore.userAddress">
      start for get wallet address
    </van-button>
    <template v-if="chainStore && chainStore.userAddress && chainStore.walletSignature">
      <van-button plain type="primary">
        wallet address: {{ chainStore.userAddress }}
      </van-button>
      <van-button plain type="primary">
        signature: {{ chainStore.walletSignature }}
      </van-button>
      <van-button plain type="danger" @click="handle">
        callBack to game
      </van-button>
    </template>
  </div>
  <load-steps ref="stepRef" @callBack="handle"></load-steps>
</template>
<script>
import $web3Ext from '@web3/web3.extend';
import { showFailToast } from 'vant';
import loadSteps from '@/components/loadSteps';
export default {
  name: 'GetWalletAddress',
  components: { loadSteps },
  data() {
    return {
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
        list: [{ step: 1, label: 'connect Wallet. ' },
          { step: 2, label: 'Get Signature Code ' },
          { step: 3, label: 'Get Wallet Signature. ' }],
        show: false,
        error: 0,
      },
    };
  },
  created(){
    this.chainStore.urlSign = this.$route.query.sign || '111111';
  },
  mounted(){
    this.$root.loading(false);
    if(process.env.prod !== 'dev'){
      //this.getWalletAddress();
    }
    this.$refs.stepRef.steps = this.steps;
  },
  methods: {
    handle(){
      let obj = { userWalletAddress: this.chainStore.userAddress, userWalletSignature: this.chainStore.walletSignature, t: new Date().valueOf() }
      window.location.href = 'uniwebview://getWalletAddress'+this.$$.Obj2String(obj);
    },
    getWalletAddress(){
      this.$refs.stepRef.steps.show = true;
      console.log('getWalletAddress start');
      $web3Ext.init('connectWallet', null, async (res) => {
        console.log('connectWallet result', res);
        if(res.err === 0){
          this.chainStore = Object.assign(this.chainStore, res.data);
          this.getSignature();
        } else {
          let msg = res.data || 'Connect Wallet Error !';
          showFailToast(msg);
          this.$$.loadStepsErr(this, 0,msg);
        }
      });
    },
    getSignature(){
      this.$refs.stepRef.steps.select = 2;
      $web3Ext.getSignature(this.chainStore.urlSign, this.chainStore.userAddress).then(r => {
        this.$refs.stepRef.steps.select = 3;
        console.log('getSignature success:', r);
        if(r.code === 0){
          this.chainStore.walletSignature = r.message;
        }else{
          //this.chainStore.walletSignature = r;
          this.$$.loadStepsErr(this, 2,r.message || 'unknown error !');
        }
      });
    },
  },
};
</script>
