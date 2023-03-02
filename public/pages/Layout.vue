<template>
  <nav>
    <h2 class="black">
      web3相关方法和demo
    </h2>
    <ul class="LFlex">
      <van-button plain type="primary" @click="handleAction('getWalletAddress')">
        获取钱包地址
      </van-button>
    </ul>
  </nav>

  <router-view v-slot="{ Component }">
    <keep-alive :max="1">
      <component v-if="$route.meta.keepAlive" :is="Component" :key="$route.fullPath" />
    </keep-alive>
    <component v-if="!$route.meta.keepAlive" :is="Component" :key="$route.fullPath" />
  </router-view>
</template>

<script>
import { Button } from 'vant';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout',
  components: { 'van-button': Button },
  data() {
    return {

    };
  },
  created(){

  },
  mounted(){
    console.log(this.$route)
  },
  methods: {
    handleAction(url){
      this.$router.push(url);
    },
  },
};
</script>
<style scoped>
nav {  }
nav ul button { margin:20px 20px 20px 0; }
</style>
