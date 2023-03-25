/**模板开始**/

const pathList = [{
  path: '/',
  name: 'Layout',
  meta: { title: process.env.title, requiresAuth: false },
  component: () => import(/* webpackChunkName: "Layout" */'@/pages/Layout.vue'),
  children: [
    {
      path: '/getWalletAddress',
      name: 'getWalletAddress',
      meta: { title: 'getWalletAddress', requiresAuth: false },
      component: () => import(/* webpackChunkName: "getWalletAddress" */'@/pages/getWalletAddress.vue'),
    },
    {
      path: '/getUniWebview',
      name: 'getUniWebview',
      meta: { title: 'getUniWebview', requiresAuth: false },
      component: () => import(/* webpackChunkName: "getUniWebview" */'@/pages/getUniWebview.vue'),
    },
    {
      path: '/mint',
      name: 'mint',
      meta: { title: 'mint', requiresAuth: false },
      component: () => import(/* webpackChunkName: "m4mMint" */'@/pages/m4mMint.vue'),
    },
    {
      path: '/lock',
      name: 'lock NFT',
      meta: { title: 'lock NFT', requiresAuth: false },
      component: () => import(/* webpackChunkName: "m4mLockNFT" */'@/pages/m4mLockNFT.vue'),
    },
    {
      path: '/unlock',
      name: 'unlock NFT',
      meta: { title: 'unlock NFT', requiresAuth: false },
      component: () => import(/* webpackChunkName: "m4mUnlockNFT" */'@/pages/m4mUnlockNFT.vue'),
    },
    {
      path: '/lockRole',
      name: 'lock Role',
      meta: { title: 'lock Role', requiresAuth: false },
      component: () => import(/* webpackChunkName: "m4mLockRole" */'@/pages/m4mLockRole.vue'),
    },
  ],
},
{
  path: '/404', name: '404', meta: { title: '404', requiresAuth: false },
  component: () => import(/* webpackChunkName: "404" */ '@/pages/404.vue'),
},
/**==404路由=========================================================================================**/
{ path: '/:pathMath(.*)', redirect: '/404' }];

export default pathList;
