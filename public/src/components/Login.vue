<template>
  <div id="login">
    <div class="modal-content col-md-4 col-md-offset-4">
      <div class="modal-header">
        <h4>Accedi</h4>
        <p>Insieme è più facile imparare</p>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
          <fieldset>
            <div class="form-group" v-bind:class="{ 'has-error' : error }">
              <div class="col-lg-12">
                <input type="text" class="form-control" v-model="username" placeholder="Username">
              </div>
            </div>

            <div class="form-group" v-bind:class="{ 'has-error' : error }">
              <div class="col-lg-12">
                <input type="password" class="form-control" v-model="password" placeholder="Password">
              </div>
            </div>

            <div v-if="error" class="form-group">
              <div class="col-lg-12">
                <h6 class="text-danger">{{ errorMsg }}</h6>
              </div>
            </div>

            <div class="form-group">
              <div class="checkbox col-lg-12">
                <label>
                  <input v-model="rememberme" type="checkbox"> Ricordami
                </label>
              </div>
            </div>

            <div class="form-group">
              <div class="col-lg-12">
                <p class="vertical-center pull-left">Hai dimenticato la password?</p>
                <button v-on:click="submitLogin" type="submit" class="btn btn-primary pull-right">Accedi</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'login',
  beforeCreate () {
    if (this.$session.exists()) {
      this.$router.push({name: 'Home'})
    }
  },

  data: () => ({
    username: '',
    password: '',
    errorMsg: '',
    error: false,
    rememberme: false
  }),

  methods: {
    submitLogin () {
      this.$http.post('http://localhost:8000/db/users/login', {
        username: this.username,
        password: this.password
      }).then(response => {
        // Success callback
        if (response.status === 200 && 'token' in response.body) {
          this.$session.start()
          this.$session.set('jwt', response.body.token)
          Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token
          if (this.rememberme) {
            this.$localStorage.set('jwt', response.body.token)
          }

          this.$router.push({name: 'Home'})
        }
      }, response => {
        // Error callback
        this.error = true
        this.errorMsg = response.body.msg
      })
    }
  }
}
</script>

<style scoped>
#login {
  margin-top:30px;
}
</style>
