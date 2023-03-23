import { createApp } from 'vue';
import App from './App.vue';
/**引入英文语言包**/
import { Toast } from 'vant';
/**全局通用方法类**/
import $$ from './$$';
/**全局路由**/
import router from './router';
import 'vant/es/toast/style';

const app = createApp(App);
app.use(router);
app.use(Toast);
app.config.globalProperties.$$ = $$;
app.config.globalProperties.$router = router;
app.mount('#app');
