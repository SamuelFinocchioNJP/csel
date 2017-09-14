import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueSession from 'vue-session'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueSession)
Vue.use(VueResource)
Vue.use(VueLocalStorage)
Vue.config.productionTip = false

// Called before any request to API Server
Vue.http.interceptors.push(function (request, next) {
  // Get the JWT token from the Local Storage
  if (Vue.localStorage.get('jwt') && !Vue.http.headers.common['Authorization']) {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + Vue.localStorage.get('jwt')
  }

  // Block any request to /logged without the Authorization header to avoid useless requests
  if (request.url === 'http://localhost:8000/db/users/logged' && !Vue.http.headers.common['Authorization']) {
    console.log('Request blocked')
    return next(request.respondWith({status: 404, statusText: 'Bad Request'}))
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  beforeCreate () {
    // Set the Authorization header if the session exists
    if (this.$session.exists() && !Vue.http.headers.common['Authorization']) {
      Vue.http.headers.common['Authorization'] = 'Bearer ' + this.$session.get('jwt')
    }

    // Start the session if the Local Storage is not empty
    if (this.$localStorage.get('jwt') && !this.$session.exists()) {
      this.$session.start()
      this.$session.set('jwt', this.$localStorage.get('jwt'))
    }
  },
  router,
  render: h => h(App)
})
