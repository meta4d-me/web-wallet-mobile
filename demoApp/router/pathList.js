/**模板开始**/

const pathList = [
  {
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
    ],
  },
  /**==404路由=========================================================================================**/
  { path: '/:pathMath(.*)', redirect: '/' },
];

export default pathList;
