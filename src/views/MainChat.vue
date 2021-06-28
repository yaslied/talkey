<script>
// @ is an alias to /src
import MainContainer from '@src/layouts/app-container-layout';
// import BaseInput from '@components/base-input';
import Talks from '@/src/components/ChatTalks.vue';
import ChatMessager from '@/src/components/Chat.vue';
// import Template from './template.vue';

import {chatMethods} from "@state/helpers";
import chat from "@state/modules/chat";

export default {
  name: 'MainChat',

  components: {
    MainContainer,
    Talks,
    ChatMessager,
  },

  data() {
    return {
      username: 'Fulano de Tal',
      email: 'emaildefulano@detal.com.br',

      oldPassword: '********',
      password: '#######',

      internListen: null,
    }
  },

  async beforeMount() {
    await this.loadUsers();
  },

  computed: {

  },

  methods: {
    ...chatMethods,

    updateProfile() {
      console.log('updating');
    },

    showOnlineUsers() {
      
    }
  }
}
</script>

<template>
  <div class="chat-page">
    <MainContainer>

      <template v-slot:left-header>
        <div class="chat-header--left">
         <span class="text-title-2 text-bolder text-gray">Conversas</span>

         <button class="button--new" @click="showOnlineUsers">
           <span class="button-text text-body text-bolder text-white">Novo Chat</span>
           <!-- <v-icon class="button-icon">mdi-plus</v-icon> -->
         </button>
        </div>
      </template>

      <template v-slot:left-body>
        <Talks class="talks"></Talks>
      </template>
      
      <template v-slot:middle-header>
        <!-- <h3>middle-header content here, <br> using vue slots</h3> -->
      </template>

      <template v-slot:middle-body>
        <ChatMessager class="chat-messager"></ChatMessager>
      </template>

      <template v-slot:right-header>
        <!-- <h3>right-header content here,<br> using vue slots</h3> -->
      </template>

      <template v-slot:right-body>
        <!-- <h3>right-body content here,<br> using vue slots</h3> -->
        <!-- <h3 class="m-t-64">don`t forget responsive mixins</h3> -->
      </template>

    </MainContainer>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

$sidebar-thin-width: 60px;

html, body {
  padding: 0;
  margin: 0;
  background-color: $background-color;
}

h3 {
  @include text(12px, 600, 1.1em, #fff, lowercase);
  letter-spacing: 0.5px;
  font-family: 'Courier New', Courier, monospace;
  color: white;
  margin: 16px 24px;
}

.chat-page {
  width: 100%;
  height: 100vh;
  background-color: $background-color;

  .chat-header--left {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    height: 100%;
    padding: 8px 16px;

    .button--new {
      border: 1px solid $line-color;
      border-radius: 10px;
      background: rgba($blue-mono-1, .3);
      min-height: 32px;
      padding: 4px 8px;

      &:hover {
        cursor: pointer;
        background: rgba($blue-mono-1, .8);
        transition: all .2s ease-in-out;

        span {
          color: $blue-mono-2;
        }
      }

      span {
        @include text(14px, 600, 1em, $blue-mono-3, lowercase);
        letter-spacing: 0.5px;
        font-family: 'Roboto';
      }
    }

    // border: 1px solid red;
  }
}

</style>

