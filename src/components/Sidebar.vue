<script>
import { authComputed, chatComputed } from '@state/helpers';
// import Locale from '@components/layout/locale';

import BaseAvatar from '@components/BaseAvatar';

let miniVariantLocal = true;
let expandOnHoverLocal = true;

export default {
  name: 'Sidebar',

  components: {
    BaseAvatar,
  },

  props: {},

  data() {
    return {
      drawer: true,
      isPinned: false,
      permanent: true,

      miniVariant: false,
      expandOnHover: false,

      navigationStatus: false,
      expandOnHoverTmp: false,

      iconColor: '#fff',
      color: '#07338c',
      right: false,
      background: false,
      // selected: 0,

      routes: [
        {
          title: 'Talkey Chats',
          isNav: true,
          icon: 'mdi-message-outline',
          to: '/',
          routeName: 'MainChat',
        },
        {
          title: 'Contatos',
          isNav: true,
          icon: 'mdi-account-group-outline',
          to: '/contacts',
          routeName: 'contacts',
        },
        {
          title: 'Perfil',
          isNav: true,
          icon: 'mdi-account-circle-outline',
          to: '/profile',
          routeName: 'profile',
        },
      ],
    }
  },

  computed: {
    ...authComputed,
    ...chatComputed,

    routeName: function () {
      // window.teste = this.$router.currentRoute;
      return this.$router.currentRoute.name
    },
  },

  watch: {
    async currentUser() {
      // await this.filterItems();
    },
    miniVariant(value) {
      console.log('changing miniLocal to', value);
      miniVariantLocal = value;
      this.expandOnHover = !!value;
    },

    expandOnHover(value) {
      console.log('changing miniLocal to', value);
      expandOnHoverLocal = value;
    },
  },

  async beforeMount() {

  },

  async mount() {
    if(this.routeName === 'client/telemedicine') {
      this.miniVariant = true;
    }
  },

  mounted() {
    this.miniVariant = miniVariantLocal;
    this.isPinned = !miniVariantLocal;
  },

  beforeDestroy() {
    console.log('beforeDestroy');
  },


  methods: {

    logout: function (event) {
      this.$router.push({ name: 'logout' });
    },

    toRouter(routeName, routePath) {
      if(routeName === this.routeName || routePath === this.$router.currentRoute.path) {
        // console.log('redundant navigation');
        return;
      }
      this.$router.push({path: routePath});
      // this.$eventHub.$emit('menuClicked', event);
    },

    pinSidebar() {
      if(this.isPinned) {
        this.miniVariant = this.expandOnHover = true;
        this.isPinned = false;
      } else {
        this.miniVariant = this.expandOnHover = false;
        this.isPinned = true;
      }
    },

  },
}
</script>

<template>
  <div v-if="routeName !== 'client/login'" class="app-component client-sidebar">
    <v-navigation-drawer
      class="navigation-drawer"
      :mini-variant.sync="navigationStatus"
      :expand-on-hover="expandOnHover"
      :mini-variant-width="70"
      width="300px"
      height="100%"
      :right="right"
      :permanent="permanent"
      absolute
    >
      <v-list class="navigation-drawer__list" dense nav>

        <v-list-item class="sidebar-options list-item">
          <v-list-item-icon class="icon-container">
            <v-icon class="option-icon" medium>fas fa-ellipsis-h</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="content-container">
            <button class="item-option" @click="pinSidebar">
              <v-icon class="option-icon" medium>{{isPinned?'mdi-pin':'mdi-pin-outline'}}</v-icon>
            </button>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item :class="['profile-group', 'list-item', 'px-0', miniVariant]">
          <v-list-item-avatar class="icon-container">
            <BaseAvatar
              :src="currentProfileImage"
              :name="currentUser.name"
            >
            </BaseAvatar>
          </v-list-item-avatar>

          <v-list-item-content class="content-container">
            <v-list-item-title class="item-label">{{userFullName}}</v-list-item-title>
            <span class="item-label">Sauver Doctor</span>
          </v-list-item-content>
        </v-list-item> -->

        <!-- items -->
        <div class="navigation-routes">
          <v-list-item
            v-for="item in routes"
            :key="item.routeName"
            class="list-item"
            :class="routeName === item.routeName ? 'router--selected' : 'router--unselected'"
            @click="toRouter(item.routeName, item.to)"
          >
            <template #default>

              <v-list-item-icon class="icon-container">
                <v-icon class="item-icon">{{item.icon}}</v-icon>
              </v-list-item-icon>

              <v-divider vertical></v-divider>

              <v-list-item-content class="content-container">
                <v-list-item-title class="item-label">{{item.title}}</v-list-item-title>
              </v-list-item-content>

            </template>
          </v-list-item>
        </div>

        <!-- logout -->
        <v-list-item class="logout-container list-item" @click="logout()">

          <v-list-item-icon class="icon-container">
            <v-icon class="item-icon" medium>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="content-container">
            <span class="item-label">Sair</span>
          </v-list-item-content>

        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.router--selected {
  border-right: 2px solid $secondary-color;
  border-radius: 0;
  background-color: rgba(174, 174, 174, 0.2);
}
.router--unselected {
  border: none;
}

.client-sidebar {
  height: 100%;
  background-color: $background-color !important;
}

$sidebar-thin-width: 70px;

.navigation-drawer {
  height: 100% !important;
  max-width: $size-client-sidebar-MxWidth; //
  background-color: $background-color !important;
  backdrop-filter: blur(3px);
  border-right: 1px solid rgba($line-color, 0.5);

  position: relative;
  z-index: 10 !important;
  list-style-type: none;

  // border-top-right-radius: 15px;
  // border-bottom-right-radius: 15px;

  @include for-desktop-down {
    position: relative;
    top: 0;
    left: 0;
  }

  &__list {
    @include flexbox(column, nowrap, flex-start, space-between);
    min-height: 100%;
    padding: 8px;
    margin: auto 0;
    text-align: left;
    overflow: hidden;

    .sidebar-options {
      max-height: 40px;
      width: 100%;
      margin: 0;

      .content-container {
        @include flexbox(row, nowrap, center, flex-end);
        width: 100%;
        max-height: 40px;
        // border-top: 1px dotted white;

        .item-option {
          max-width: 40px;
          margin: 0 0 0 8px;
        }
      }

      .option-icon {
        color: #fff;
        height: 24px;
        width: 24px;
      }

    }

    .navigation-routes {
      // height: 100%;
      margin: auto 0;
      min-height: 180px;
      width: 100%;
      // border: 1px solid red;
    }

    .list-item {
      margin: 10px 0;
      padding: 4px 0;
      max-height: 45px;
      width: 100%;

      @include for-desktop-down {
        margin: 8px 0;
        max-height: 35px;
      }

      .icon-container {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
        width: 40px;
        height: 32px;
        margin: 0 4px;

        .item-icon {
          width: 24px;
          height: 24px;
          margin-top: 0;
          color: $secondary-color;
        }
      }

      .content-container {
        min-width: 150px !important;
        width: 100%;
        text-align: left;
        padding: 8px 16px;

        .item-label {
          @include text(14px, 600, 1em, #fff, normal);
          font-family: 'Opens Sans', 'Courier New', Courier, monospace;
          text-decoration: none;
          letter-spacing: 0.5px;
        }
      }

    }

    .chat-content {
      max-height: 45px;
      width: 100%;
      padding: 4px 0;
      margin: 16px 0 auto 0 !important;
    }

    .logout-container {
      max-height: 45px;
      width: 100%;
      margin: auto 0 24px 0;

      .item-icon, .item-label {
        color: #fff;
      }
      .item-label {
        @include text(14px, 600, 24px, #fff, uppercase);
        letter-spacing: 0.5px;
        margin: 0 auto;
      }
    }

  }
}
</style>
