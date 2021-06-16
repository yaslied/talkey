<template>
  <div id="app">
    <div id="nav">
      <router-link class="links" to="/">Home</router-link>
      <router-link class="links" to="/login">Login</router-link>
      <router-link class="links" to="/reset">Reset</router-link>
      <router-link class="links" to="/register">Register</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
// @import '@design';
$background-color: #323739;

#app {
  // font-family: 'Open Sans Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000;
  background-color: $background-color;
  margin: 0;
  padding: 0;
}

html {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.links {
  text-decoration: none;
  color: white;
  margin: 0 8px;
}

.app-page {
  background-color: $background-color;
  min-height: 100vh;
}
</style>
