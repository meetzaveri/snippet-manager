<template>
  <div id="app" style="margin-top: 0.5rem;">
    <b-nav tabs>
      <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
      <b-nav-item><router-link to="/new-snippet">New Snippet</router-link></b-nav-item>
      <b-nav-item><router-link to="/code-book">Code Book</router-link></b-nav-item>
    </b-nav>
    <b-row class="justify-content-md-center" style="margin-top: 0.5rem;">
     <router-view/>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
