
<script>
// @ is an alias to /src

import {rootComputed, chatComputed, authComputed, authMethods} from '@state/helpers';

export default {
  name: 'MainLayout',
  components: {
  },

  computed: {
    ...rootComputed,
    ...chatComputed,
    ...authComputed,

    computedUser() {
      return this.currentUser || null;
    },

    computedUid() {
      return this.computedUser?.id || 'undefined';
    },

    routePath() {
      return this.$router.currentRoute.fullPath;
    },

    sidebarGuard() {
      return this.isLoggedin;
    }
  },

  methods: {
    ...authMethods,

    async logout (event) {
      console.log("current router", this.routePath);
      try {
        await this.logOut();
      } catch(error) {
        console.error('Logout Error', error);
        this.$router.push({ path: '/login' });
      }
    },
  }
}
</script>

<template>
  <div class="app-main-layout">
    <div class="layout-sidebar" v-show="sidebarGuard">
      <slot name="side"></slot>
    </div>

    <div class="layout-container">

      <div v-if="isLoading" class="container--loading">
        <span class="text-big-title text-bolder">Carregando...</span>
      </div>

      <div v-else class="container--loaded">
        <div class="app-status">
          <span>socket: {{}}</span>
          <span>user: {{computedUid}}</span>

          <button class="force-logout" @click="logout">
            <v-icon color="#ff5052">mid-close-thick</v-icon>
          </button>
        </div>
        <slot  name="container"></slot>
      </div>

    </div>

  </div>
</template>


<style lang="scss" scoped>
@import '@design';

$sidebar-thin-width: 70px;

html, body {
  padding: 0;
  margin: 0;
  background-color: $background-color;
}

.app-main-layout {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  height: 100vh;
  overflow: hidden;

  .layout-sidebar {
    min-width: $sidebar-thin-width;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: $background-color;
  }

  .layout-container {
    width: 100%;
    height: 100%;

    .container--loading {
      @include flexbox(column, nowrap, center, center);
      width: 100%;
      height: 100%;
      color: white;
    }

    .container--loaded {
      @include flexbox(column, nowrap, flex-start, flex-start);
      width: 100%;
      height: 100%;

      .app-status {
        display: inline-flex;
        align-items: center;
        width: 100%;
        height: 25px;
        border-bottom: 2px dashed $line-color;
        padding: 2px 8px;

        span {
          @include text(10px, 600, 1em, #fff, normal);
          margin: 0 16px 0 0;
        }

        .force-logout {
          height: 25px;
          background-color: rgba(#ff5052, .4);
          width: 32px;
        }
      }
    }
  }
}

</style>
