import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRoutes = [
    {
        path: '/',
        component: () => import('@/views/demo/index'),
        redirect: 'demo',
        children: [
            {
                path: 'demo',
                name: 'demo',
                component: () => import('@/views/demo/index'),
            },
        ],
    },
];

const createRouter = () => new Router({
    // mode: 'history',
    scrollBehavior: () => ({
        y: 0,
    }),
    routes: constantRoutes,
});

const router = createRouter();

export const resetRouter = () => {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
};

export default router;
