<script>
// @ is an alias to /src
import MainContainer from '@src/layouts/app-container-layout';
// import BaseInput from '@components/base-input';
import Talks from '@/src/components/ChatTalks.vue';
import ChatMessager from '@/src/components/Chat.vue';
// import Template from './template.vue';

import {chatMethods, chatComputed} from "@state/helpers";

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
    await this.load();

  },

  computed: {
    ...chatComputed,

    users() {
      return this.allUsers || [];
    }
  },

  methods: {
    ...chatMethods,

    async load() {
      await this.$store.dispatch('chat/loadUsers');
    },

    updateProfile() {
      console.log('updating');
    },

    showOnlineUsers() {

    },

    setCurrentChat(chat) {
      this.$store.dispatch('chat/setChatCurrent', chat.talkId);
      // this.setChatCurrent(chat);
      console.log('chatCurrent', this.chatCurrent);
      console.log('chatCurrentId', this.chatCurrentId);
      console.log('chatCurrentMessages', this.chatCurrentMessages);
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

         <!-- <button class="button--new" @click="showOnlineUsers">
           <span class="button-text text-body text-bolder text-white">Novo Chat</span>
         </button> -->
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
        <div class="head-new">
          <span class="text-body-2 text-bold text-gray">Nova Conversa</span>
        </div>
        <div class="talks-body">
          <v-list-item class="talk-items"
            v-for="(user, index) in users" 
            :key="`talk-item-${index}`"
            @click="setCurrentChat(user)"
          >
            <div class="avatar-content">
              <BaseAvatar
              class="avatar"
              :name="user.name"
              ></BaseAvatar>
            </div>

            <v-list-item-content class="item-content">
              <span class="item-name">{{user.username?user.username:'indefinido'}}</span>
              <!-- <span v-else class="item-name">{{chat.name?chat.name:'indefinido'}}</span>
              <span class="item-preview">
                <strong>{{chat.lastSenderName || 'fulano'}}:</strong>
                {{(chat.lastMessage || {}).messageText?resolveLast(chat.lastMessage.messageText):'indefinido'}}
              </span> -->
            </v-list-item-content>
          </v-list-item>
        </div>
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

.head-new {
  height: 40px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  text-align: left;
  padding: 8px 16px;
  border-bottom: 2px solid $line-color;
}

.talks-body {
  width: 100%;
  height: 100%;
  min-height: 650px;
  overflow-y: scroll;
}

.talk-items {
  @include flexbox(row, nowrap, center, flex-start);
  min-height: 60px;
  max-height: 65px;
  border-bottom: 1px solid $line-color;
  // border: 1px solid red;
  padding: 4px 8px;

  &:hover {
    cursor: pointer;
    background: rgba(black, .1);
  }

  .avatar-content {
    margin: 0 8px 0 0;
    // border: 1px solid red;
  }

  .item-content {
    @include flexbox(column, nowrap, flex-start, center);
    min-height: 60px;

    .item-name, .item-preview {
      @include text(14px, 600, 1.4em, #fff, normal);
      font-family: 'Open Sans Regular', Courier, monospace;
      color: $gray-shade-1;
    }

    .item-preview {
      max-width: 80%;
      @include text(10px, 500, 1.4em, $gray-shade-1, lowercase);
      letter-spacing: 0.7px;
      font-family: 'Open Sans Regular', Courier, monospace;
      word-break: normal;
    }
  }

  .item-info {
    @include flexbox(column, nowrap, flex-start, space-between);
    min-width: 40px;

    .item-time, .item-count {
      color: $gray-shade-1;
    }

    .item-count {
      display: none;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 16px;
      border-radius: 20px;
      background-color: $blue-mono-2;
      margin: 0 0 0 8px;

      @include text(12px, 600, 1.4em, #fff, lowercase);
      font-family: 'Courier New', Courier, monospace;
    }
  }
}

</style>

