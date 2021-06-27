import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueMoment from 'vue-moment'
import moment from 'moment'

// import { config } from '@src/config';
// import '@fortawesome/fontawesome-free/css/all.css';
// import 'vue-material/dist/vue-material.min.css';
import vuetify from '@src/plugins/vuetify';

Vue.config.productionTip = false
// Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// Vue.use(VueMoment, {
//   moment
// });
window.moment = moment;