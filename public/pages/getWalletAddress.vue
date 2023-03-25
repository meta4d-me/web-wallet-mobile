<template>
  <div class="getWalletAddress">
    <van-button plain type="success" @click="getWalletAddress" v-if="!chainStore || !chainStore.userAddress">
      点击这里，开始获取用户钱包地址
    </van-button>
    <template v-if="chainStore && chainStore.userAddress && chainStore.walletSignature">
      <van-button plain type="primary">
        用户钱包地址：{{ chainStore.userAddress }}
      </van-button>
      <van-button plain type="primary">
        签名：{{ chainStore.walletSignature }}
      </van-button>
      <van-button plain type="danger" @click="handle">
        点击回传参数给unity
      </van-button>
    </template>

  </div>
</template>
<script>
import $web3Ext from '@web3/web3.extend';
import { showFailToast } from 'vant';
export default {
  name: 'GetWalletAddress',
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
    };
  },
  created(){
    this.chainStore.urlSign = this.$route.query.sign || '111111';
  },
  mounted(){
    this.$root.loading(false);
  },
  methods: {
    handle(){
      let obj = { userWalletAddress: this.chainStore.userAddress, userWalletSignature: this.chainStore.walletSignature, t: new Date().valueOf() }
      window.location.href = 'uniwebview://getWalletAddress'+this.$$.Obj2String(obj);
    },
    getWalletAddress(){
      //showFailToast('未知错误！');
      $web3Ext.init('connectWallet', null, async (res) => {
        console.log(res)
        if(res.err === 0){
          this.chainStore = Object.assign(this.chainStore, res.data);
          this.getSignature();
        } else {
          if(res.data){
            showFailToast(res.data);
          } else {
            showFailToast('未知错误！');
          }
        }
      });
    },
    getSignature(){
      $web3Ext.getSignature(this.chainStore.urlSign, this.chainStore.userAddress).then(r => {
        console.log('getSignature success:', r);
        this.chainStore.walletSignature = r;
      });
    },
  },
};
</script>
