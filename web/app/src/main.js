
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'nprogress/nprogress.css'

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import index from "./store";
import axios from 'axios'

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
}

new Vue({
  vuetify,
  router,
  store: index,
  render: h => h(App)
}).$mount('#app');
