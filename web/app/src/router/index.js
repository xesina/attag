import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import("@/views/Login")
        },
        {
            path: '/logout',
            name: 'Logout',
            component: () => import("@/views/Logout"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/',
            name: 'Index',
            component: () => import("@/views/Index"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/labels',
            name: 'Labels',
            component: () => import("@/views/Labels"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/archive',
            name: 'Archive',
            component: () => import("@/views/Archive"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/trash',
            name: 'Trash',
            component: () => import("@/views/Trash"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/settings',
            name: 'Settings',
            component: () => import("@/views/Settings"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/help',
            name: 'Help',
            component: () => import("@/views/Help"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/app',
            name: 'Apps',
            component: () => import("@/views/Apps"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/shortcuts',
            name: 'Shortcuts',
            component: () => import("@/views/Shortcuts"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/404',
            name: 'NotFound',
            component: () => import("@/views/NotFound"),
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next({name: "Login"})
    } else {
        next()
    }
})

export default router;