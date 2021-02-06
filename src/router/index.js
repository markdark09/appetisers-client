import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../views/calendar/Index.vue'
import Login from '../views/auth/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const AUTHENTICATED = (to, from, next) => {
  if (!store.getters['auth/authenticated']) {
    return next({
      name: 'login'
    })
  }

  next()
}

const NOTAUTHENTICATED = (to, from, next) => {
  if (store.getters['auth/authenticated']) {
    return next({
      name: 'calendar'
    })
  }

  next()
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: NOTAUTHENTICATED
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
    beforeEnter: AUTHENTICATED
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
