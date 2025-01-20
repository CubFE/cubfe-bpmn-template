import {
    createRouter,
    createWebHashHistory,
    type RouteRecordRaw,
} from "vue-router";
import NProgress from 'nprogress';
import {Newspaper} from "lucide-vue-next";
import {useI18n} from "vue-i18n";
import i18n from "@/core/plugins/i18n.ts";
export const constantRouters: Array<RouteRecordRaw> = [
    {
        path: '/redirect',
        component: import('@/layout/SiderLayout.vue'),
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/Index.vue')
            }
        ]
    },
    {
        path: '/',
        redirect: '/designer',
        meta: {
            type: 'M',
            hideSidebar: false,
            middleware: "auth",
            pageTitle: "route.workspace.title"
        },
        component: () => import('@/layout/SiderLayout.vue'),
        children: [
            {
                path: 'designer',
                component: () => import('@/views/Designer.vue'),
                name: 'designer',
                meta: {
                    type: 'C',
                    pageTitle: 'route.workflow.model-designer',
                    icon: Newspaper,
                    hideSidebar: false
                }
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
];
const router = createRouter({
    history: createWebHashHistory(),//createWebHashHistory(),
    routes: constantRouters,
});
router.isReady().then(() => {
    // if(authStore.isAuthenticated) {
    //     authStore.getPermission()
    // }
});
router.beforeEach((to, from, next) => {
    NProgress.start(); // start progress bar
    const t = i18n.global.t
    document.title = `${t(to.meta.pageTitle)} - ${t("app.title")}`;
    next();
    // Scroll page to top on every route change
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
export default router;








