import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import app from './app';
import router from './routers';
import store from './store';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';


Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(MuseUI);

new Vue({
  router,
  store,
  render: to => to(app)
}).$mount('#app');