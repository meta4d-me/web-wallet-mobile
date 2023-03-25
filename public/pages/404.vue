<template>
  <div class="page404 MFlex">
    <h2>404</h2>
    <h3>啊哦~ 你所访问的页面不存在</h3>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Page404',
  data() {
    return {
    };
  },
  created(){

  },
  mounted(){
    this.$root.loading(false);
  },
  methods: {

  },
};
</script>
<style scoped>
.page404 { height:100%; width:100%; }
</style>

