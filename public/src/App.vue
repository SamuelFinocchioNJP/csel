<template>
  <div id="app">
    <nav class="navbar navbar-inverse navbar-expand-md">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">CSEL</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><a href="#">Home</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li v-if="!this.$session.exists()"><router-link to="login">Login</router-link></li>
            <li v-if="!this.$session.exists()"><router-link to="signup">Signup</router-link></li>
            <li v-if="this.$session.exists()"><router-link to="logout">Logout</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
