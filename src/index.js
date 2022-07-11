import Vue from 'vue';
import App from './App';
import store from '../plugins/store';
import router from '../plugins/router';
import '@plugins/FontAwesome.js';
import '@public/index.scss';
import VueQrcodeReader from 'vue-qrcode-reader';
// import '@plugins/lib/bootstrap.min.css';
// import '@plugins/lib/bootstrap.min.js';
import '@plugins/lib/jquery-3.4.1.min.js';
// import '@plugins/lib/summernote.min.css';
import '@plugins/lib/summernote.min.js';


Vue.use(VueQrcodeReader);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#root');