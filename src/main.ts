import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
/**引入英文语言包**/
import { Toast } from 'vant';
/**全局通用方法类**/
import $$ from './$$/$$';
import 'vant/es/toast/style';
import '../polyfills';

const app = createApp(App);
app.use(router);
app.use(Toast);
app.config.globalProperties.$router = router;
app.config.globalProperties.$$ = $$;
app.mount('#app');
