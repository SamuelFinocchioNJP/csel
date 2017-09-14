import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { Auth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})

// Autentication middleware
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.Auth)) {
    Vue.http.get('http://localhost:8000/db/users/logged', {
    }).then(response => {
      // Logged response
      return next()
    }, response => {
      // Unlogged response
      return router.push({name: 'Login'})
    })
  }
  return next()
})

export default router
