// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { routes } from './router';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { store } from './store/index';
import Toasted from 'vue-toasted'
import 'simple-line-icons/css/simple-line-icons.css';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 2000
})

const router =  new VueRouter({
  mode:'history',
  routes:routes
  });
  

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
