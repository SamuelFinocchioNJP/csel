<template>
  <div id="signup">
    <div class="modal-content col-md-4 col-md-offset-4">
      <div class="modal-header">
        <h4>Registrati</h4>
        <p>Entra anche tu nella community</p>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
          <fieldset>
            <div class="row">

              <div class="col-lg-6">
                <div class="form-group" v-bind:class="{ 'has-error' : errors['name'] }">
                  <div class="col-lg-12">
                    <input type="text" class="form-control" v-model="name" placeholder="*Nome">
                    <h6 v-if="errors['name']" class="text-danger">{{ errors['name'] }}</h6>
                  </div>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group" v-bind:class="{ 'has-error' :  errors['surname'] }">
                  <div class="col-lg-12">
                    <input type="text" class="form-control" v-model="surname" placeholder="*Cognome">
                    <h6 v-if="errors['surname']" class="text-danger">{{ errors['surname'] }}</h6>
                  </div>
                </div>
              </div>

            </div>
            <div class="form-group" v-bind:class="{ 'has-error' :  errors['email'] }">
              <div class="col-lg-12">
                <input type="text" class="form-control" v-model="email" placeholder="*Email">
                <h6 v-if="errors['email']" class="text-danger">{{ errors['email'] }}</h6>
              </div>
            </div>

            <div class="form-group" v-bind:class="{ 'has-error' :  errors['telephoneNumber'] }">
              <div class="col-lg-12">
                <input type="text" class="form-control" v-model="telephoneNumber" placeholder="Telefono">
                <h6 v-if="errors['telephoneNumber']" class="text-danger">{{ errors['telephoneNumber'] }}</h6>
              </div>
            </div>

            <div class="form-group" v-bind:class="{ 'has-error' : errors['username'] }">
              <div class="col-lg-12">
                <input type="text" class="form-control" v-model="username" placeholder="*Username">
                <h6 v-if="errors['username']" class="text-danger">{{ errors['username'] }}</h6>
              </div>
            </div>

            <div class="form-group" v-bind:class="{ 'has-error' : errors['password'] }">
              <div class="col-lg-12">
                <input type="password" class="form-control" v-model="password" placeholder="*Password">
                <h6 v-if="errors['password']" class="text-danger">{{ errors['password'] }}</h6>
              </div>
            </div>

            <div class="form-group" v-bind:class="{ 'has-error' : errors['confirmpwd'] }">
              <div class="col-lg-12">
                <input type="password" class="form-control" v-model="confirmpwd" placeholder="*Conferma Password">
                <h6 v-if="errors['confirmpwd']" class="text-danger">{{ errors['confirmpwd'] }}</h6>
              </div>
            </div>

            <div class="form-group">
              <div class="col-lg-12">
                <button v-on:click="submitSignup" type="submit" class="btn btn-primary pull-right">Registrati</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'signup',
  beforeCreate () {
    if (this.$session.exists()) {
      this.$router.push({name: 'Home'})
    }
  },
  data: () => ({
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    confirmpwd: '',
    telephoneNumber: '',
    errors: []
  }),

  methods: {
    submitSignup () {
      if (this.password === this.confirmpwd) {
        this.$http.post('http://localhost:8000/db/users/new', {
          name: this.name,
          surname: this.surname,
          email: this.email,
          telephoneNumber: this.telephoneNumber,
          username: this.username,
          password: this.password
        }).then(response => {
          // Success callback
          router.push({name: 'Login'})
        }, response => {
          // Error callback
          this.errors = []
          for (var error in response.body.errors) {
            this.errors[error] = response.body.errors[error]['message']
          }
        })
      } else {
        this.errors = []
        this.errors['password'] = ' '
        this.errors['confirmpwd'] = 'Le password non corrispondono'
      }
    }
  }
}
</script>

<style scoped>
#signup {
  margin-top:30px;
}
</style>
