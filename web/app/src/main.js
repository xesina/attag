
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import index from "./store";



Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store: index,
  render: h => h(App)
}).$mount('#app');
