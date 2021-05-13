import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => lazyLoadView(import('@views/Home')),
  },
  {
    path: '/library',
    name: 'library',
    component: () => lazyLoadView(import('@views/Library')),
  },
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@views/Login')),
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => lazyLoadView(import('@views/Reset')),
  },
  {
    path: '/register',
    name: 'register',
    component: () => lazyLoadView(import('@views/Register')),
  },
]

function lazyLoadView(AsyncView, params = {}) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@views/_loading'),
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@views/_timeout'),
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}

const router = new VueRouter({
  routes,
})

export default router
