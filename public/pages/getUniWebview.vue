<template>
  <div class="getUniWebview">
    <van-button plain type="success" @click="getParams">
      点击这里，开始获取unity传入参数
    </van-button>
    <template v-if="params">
      <van-button plain type="primary">
        unity传入参数：{{ params }}
      </van-button>
      <van-button plain type="danger" @click="handle">
        点击回传参数给unity
      </van-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'GetUniWebview',
  data() {
    return {
      params: null,
    };
  },
  created(){
  },
  mounted(){
    this.getParams();
    setTimeout(() => {
      this.handle();
    }, 500);
    this.$root.loading(false);
  },
  methods: {
    getParams(){
      this.params = this.$$.getURLParam({}, window.location.href);
    },
    handle(){
      let obj = { ...this.params, t: new Date().valueOf() }
      window.location.href = 'uniwebview://close'+this.$$.Obj2String(obj);
    },
  },
};
</script>
