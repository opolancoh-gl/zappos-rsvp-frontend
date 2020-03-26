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
import $appUtils from './utils/app-utils';
import $textUtils from './utils/text-utils';

// add filters
DateFilter.forEach((item) => Vue.filter(item.name, item.f));
TextFilter.forEach((item) => Vue.filter(item.name, item.f));

// add instance properties
Vue.config.productionTip = false;
Vue.prototype.$_app = $appUtils;
Vue.prototype.$_textUtils = $textUtils;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
