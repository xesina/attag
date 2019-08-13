import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/components/Index'
// import HelloWorld from "./components/Index";


Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/index',
            name: 'Index',
            component: Index
        }
    ]
});