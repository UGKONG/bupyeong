/* eslint-disable react-hooks/rules-of-hooks */
import Vue from 'vue';
import App from './App.vue';
import vuetify from 'vuetify';
import vuex from './vuex';
import 'vuetify/dist/vuetify.min.css';

Vue.use(vuetify);

new Vue({
  vuetify: new vuetify({}),
  store: vuex,
  render: h => h(App)
}).$mount('#root');