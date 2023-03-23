import { createRouter, createWebHashHistory } from 'vue-router';
import pathList from './pathList';
import $$ from '@App/$$'; /**自定义方法和类**/

const router = createRouter({
  history: createWebHashHistory(),
  routes: pathList,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0,
      }
    }
  },
});

$$.routers = router;

/**路由进入之前**/
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});


router.afterEach(() => {
  document.documentElement.scrollTop = 0;
  if (window.onscroll) {
    window.onscroll = null;
  }
  if (window.setInterval) {
    window.clearInterval;
  }
  if (window.onresize) {
    window.onresize = null;
  }
});


export default router;

