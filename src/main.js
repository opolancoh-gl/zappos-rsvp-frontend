import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
// eslint-disable-next-line import/extensions
import '@fortawesome/fontawesome-free/js/all.js';

import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// filters
import DateFilter from './filters/date-filter';
import TextFilter from './filters/text-filter';

// utils
import $app from './utils/app';
import $helpers from './utils/helpers';
import $validation from './utils/validation';

// add filters
DateFilter.forEach((item) => Vue.filter(item.name, item.f));
TextFilter.forEach((item) => Vue.filter(item.name, item.f));

// add instance properties
Vue.config.productionTip = false;
Vue.prototype.$_app = $app;
Vue.prototype.$_helpers = $helpers;
Vue.prototype.$_validation = $validation;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
