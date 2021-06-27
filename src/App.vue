<script>
import MainLayout from '@src/layouts/app-main-layout';
import Sidebar from '@src/components/Sidebar';

export default {
  name: 'App',

  components: {
    MainLayout,
    Sidebar,
  },

  data() {
    return {

    }
  },
  beforeMount() {
  },
}
</script>


<template>
  <div id="app">
     <MainLayout>

      <template v-slot:side>
        <Sidebar class="side"></Sidebar>
      </template>

      <template v-slot:container>
        <router-view />
      </template>

    </MainLayout>
  </div>
</template>

<style lang="scss">
// @import '@design';
$background-color: #323739;

html, body {
  background-color: $background-color;
}

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

#nav {
  background-color: $background-color;
  height: 35px;
  width: 100%;
  margin: 0;
  padding: 4px 32px;

  border: 1px solid white;

  .links {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.1em;
    color: #0a84ff;
    text-transform: lowercase;
    letter-spacing: 0.5px;
    font-family: 'Courier New', Courier, monospace;
    text-decoration: none;
    margin: 0 8px;

    &:hover {
      cursor: pointer;
      transform: scale(1.01);
    }
  }

  .memo {
    font-size: 14px;
    color: #fff;
    margin-left: auto;
    font-family: 'Courier New', Courier, monospace;
  }
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
