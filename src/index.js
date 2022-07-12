import Vue from 'vue';
import App from './App';
import store from '../plugins/store';
import router from '../plugins/router';
import '@plugins/FontAwesome.js';
import '@public/index.scss';
import VueQrcodeReader from 'vue-qrcode-reader';
import AxiosPlugin from 'vue-axios-cors';
import axios from 'axios';
// import '@plugins/lib/bootstrap.min.css';
// import '@plugins/lib/bootstrap.min.js';
import '@plugins/lib/jquery-3.4.1.min.js';
// import '@plugins/lib/summernote.min.css';
import '@plugins/lib/summernote.min.js';


Vue.use(VueQrcodeReader);
Vue.use(AxiosPlugin);

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#root');