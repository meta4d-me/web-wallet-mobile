import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Layout',
        meta: { title: process.env.title, requiresAuth: false },
        component: () => import(/* webpackChunkName: "Layout" */'@views/Layout.vue'),
        children: [
            {
                path: '/getWalletAddress',
                name: 'getWalletAddress',
                meta: { title: 'getWalletAddress', requiresAuth: false },
                component: () => import(/* webpackChunkName: "getWalletAddress" */'@views/getWalletAddress.vue'),
            },
            {
                path: '/getUniWebview',
                name: 'getUniWebview',
                meta: { title: 'getUniWebview', requiresAuth: false },
                component: () => import(/* webpackChunkName: "getUniWebview" */'@views/getUniWebview.vue'),
            },
            {
                path: '/mint',
                name: 'mint',
                meta: { title: 'mint', requiresAuth: false },
                component: () => import(/* webpackChunkName: "getUniWebview" */'@views/m4mMint.vue'),
            }
        ]
    },
    {
        path: '/404', name: '404', meta: {title: '404'},
        component: () => import(/* webpackChunkName: "403" */ '@views/404.vue'),
    },
    { path: '/:pathMath(.*)', redirect: '/404' },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}` || `${process.env.title}`;
    next();
});

export default router;
