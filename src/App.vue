<template>
  <div id="app" class="max-w-10xl mx-auto">
    <img class="logo" alt="Logo" src="@/assets/eliis_logo.png" width="104" height="34">
    <nav>
      <router-link to="/events">Events</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Open Sans, sans-serif;
}
.logo {
  width: 104px;
  height: auto;
  margin: 1rem;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
