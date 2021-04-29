import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'vue-material/dist/vue-material.min.css'
// import '@fortawesome/fontawesome-free/css/all.css'

// import { config } from '@src/config'

Vue.config.productionTip = false
// Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
