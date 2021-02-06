import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// Extensions or packages
import { ValidationProvider } from 'vee-validate'
import VueConfirmDialog from 'vue-confirm-dialog'
import Loader from './components/loader/Index.vue'
import Snackbar from './components/snackbar/Index.vue'
import axios from 'axios'

// Register installed components globally
window.moment = require('vue-moment')

Vue.use(VueConfirmDialog)
Vue.use(require('vue-moment'))
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.component('loader', Loader)
Vue.component('snackbar', Snackbar)
Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8000/'

// Check tokens if expired or not.
require('./store/login/subscriber')

store.dispatch('auth/attempt', localStorage.getItem('token'))
  .then(() => {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  })
