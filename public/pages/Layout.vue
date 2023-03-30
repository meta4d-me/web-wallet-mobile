<template>
  <nav>
    <van-icon name="close" class="close Flex" @click="handleAction('close')" v-if="env === 'dev'"/>
    <h2 class="black">
      web3 demo
    </h2>
    <ul>
      <template v-for="(item,index) in ul" :key="index">
        <van-button
          v-if="item.show"
          plain
          type="primary"
          size="small"
          :id="item.path"
          @click="handleAction('/'+item.path)"
        >
          {{ item.label }}
        </van-button>
      </template>
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
import { Button, Icon } from 'vant';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout',
  components: { 'van-button': Button, 'van-icon': Icon },
  data() {
    return {
      ul: [
        { label: 'get Wallet Address', path: 'getWalletAddress', show: true },
        { label: 'Mint Work Flow', path: 'mint', show: true },
        { label: 'Lock NFT Work Flow', path: 'lock', show: true },
        { label: 'Lock Role Work Flow', path: 'lockRole', show: true },
        { label: 'Unlock Work Flow', path: 'unlock', show: true },
        { label: 'query image', path: 'pic', show: false },
      ],
      env: process.env.prod,
    };
  },
  created(){

  },
  mounted(){
    this.$$.$('html').classList.add(this.$$.ENV.env, process.env.prod);
    this.$$.$('html').setAttribute('sys', process.env.sysName);
    this.$root.loading(false);
  },
  methods: {
    handleAction(url){
      if(url === 'close'){
        window.location.href = 'uniwebview://close?t='+new Date().valueOf();
      }else{
        this.$router.push(url);
      }
    },
  },
};
</script>
<style scoped>
nav { padding:0 0 10px; border-bottom:2px solid #07c160; margin:0 0 15px }
nav ul button { margin: 5px 10px 5px 0; }
.close { position:absolute; right:5px; top:5px; font-size:40px; color:#f00; cursor: pointer; z-index: 1000; }
</style>
