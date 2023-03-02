<template>
  <div class="getWalletAddress">
    <van-button plain type="success" @click="getWalletAddress" v-if="!chainStore">点击这里，开始获取用户钱包地址</van-button>
    <van-button plain type="success" v-if="chainStore">用户钱包地址：{{chainStore.userAddress}}</van-button>
  </div>
</template>

<script>
import $web3Ext from '@web3/web3.extend';
import { showFailToast } from 'vant';
export default {
  name: 'getWalletAddress',
  data() {
    return {
      chainStore: null,
    };
  },
  created(){

  },
  mounted(){

  },
  methods: {
    getWalletAddress(){
      $web3Ext.init('connectWallet', null, async (res) => {
        console.log(res)
        if(res.err === 0){
          this.chainStore = res.data;
        } else {
          if(res.data){
            showFailToast(res.data);
          } else {
            showFailToast('未知错误！');
          }
        }
      });
    },
  },
};
</script>