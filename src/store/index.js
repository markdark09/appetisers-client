import Vue from 'vue'
import Vuex from 'vuex'
import auth from './login/auth'
import response from './response/index'
import calendar from './calendar/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: auth,
    response: response,
    calendar: calendar
  }
})
