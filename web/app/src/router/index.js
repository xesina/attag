import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: () => import("@/views/Index")
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import("@/views/Login")
        },
        {
            path: '/labels',
            name: 'Labels',
            component: () => import("@/views/Labels")
        },
        {
            path: '/archive',
            name: 'Archive',
            component: () => import("@/views/Archive")
        },
        {
            path: '/trash',
            name: 'Trash',
            component: () => import("@/views/Trash")
        },
        {
            path: '/settings',
            name: 'Settings',
            component: () => import("@/views/Settings")
        },
        {
            path: '/help',
            name: 'Help',
            component: () => import("@/views/Help")
        },
        {
            path: '/app',
            name: 'Apps',
            component: () => import("@/views/Apps")
        },
        {
            path: '/shortcuts',
            name: 'Shortcuts',
            component: () => import("@/views/Shortcuts")
        },
    ]
});