<template>
  <div id="demoApp" :class=ENV>
    <router-view />
  </div>
</template>
<script>
import { showLoadingToast } from 'vant';
export default {
  name: 'App',
  data() {
    return {
      ENV: this.$$.ENV.env,
      jumpTo: '',
      event: false,
    };
  },
  watch: {
    $route(to, from){
      //console.log(1)
      //console.log(to, from);
      this.loading(true);
    },
  },
  created(){

  },
  mounted(){

  },
  methods: {
    /**加入toast loading**/
    loading(boolean){
      showLoadingToast({
        message: 'loading...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: boolean ? 0 : 100,
      });
    },
  },
};
</script>
<style scoped>
#demoApp { padding:20px; }
</style>
