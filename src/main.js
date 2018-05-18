// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { routes } from './router';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'simple-line-icons/css/simple-line-icons.css';
import { store } from './store/index';
import Toasted from 'vue-toasted';
import VeeValidate from 'vee-validate';


Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VeeValidate);

Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 1500
})

export const router = new VueRouter({
  routes,
  mode: 'history',
});

const checkUserIsLoggedIn = () => {
  var token = localStorage.getItem('token');
  if(token !== null){
    return true;
  } else{
    return false;
  }
}

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    if (checkUserIsLoggedIn()) {
      next();
    } else {
      router.push('/login');
    }
  }  else if (to.path === '/new-snippet') {
    if (checkUserIsLoggedIn()) {
      next();
    } else {
      router.push('/login');
    }
  } else if (to.path === '/code-book') {
    if (checkUserIsLoggedIn()) {
      next();
    } else {
      router.push('/login');
    }
  }  else if (to.path === '/run-code') {
    if (checkUserIsLoggedIn()) {
      next();
    } else {
      router.push('/login');
    }
  } else{
    next();
  }
})


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
