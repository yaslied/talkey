<script>
import {chatComputed, chatMethods} from '@state/helpers';
import * as moment from "moment";
import BaseAvatar from '@src/components/BaseAvatar.vue';

export default {
  name: 'ChatTalks',
  components: {
    BaseAvatar,
  },

  data() {
    return {}
  },
  created () {
  },
  async beforeMount() {
    await this.loadUsers;
    await this.loadChats;
  },

  computed: {
    ...chatComputed,

    chats () {
      return this.chatTalks || [];
    },

    chatsLength () {
      return this.chatTalks?.length || 0;
    }
  },
  methods: {
    ...chatMethods,

    resolveLast(text) {
      return text.length < 20 ? text : `${text.substring(0, 18)}...`;
    },
    setTime(time){
      return (moment(time)).format('DD/MM/YYYY HH:SS')
    },
    getLastSender(id){
      return (this.allUsers || []).find(a => a.id === id) || {};
    },
    setCurrentChat(chat){
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
  <v-list class="chatTalks">
    <v-list-item class="talks-header">
      <span class="text-body-2 text-gray text-bolder"> Todas as conversas </span>
      <div class="talks-counter">
        <span class="text-body-2">{{chatsLength}}</span>
      </div>
    </v-list-item>

    <div class="talks-body">
      <v-list-item class="talk-items"
        v-for="(chat, index) in chats" 
        :key="`talk-item-${index}`"
        @click="setCurrentChat(chat)"
      >
        <div class="avatar-content">
          <BaseAvatar
          class="avatar"
          :name="(chat.talkType === 'P2P')?chat.users[0].username || '':chat.name || ''"
          ></BaseAvatar>
        </div>

        <v-list-item-content class="item-content">
          <span  v-if="chat.talkType === 'P2P'" class="item-name">{{chat.users[0].username?chat.users[0].username:'indefinido'}}</span>
          <span v-else class="item-name">{{chat.name?chat.name:'indefinido'}}</span>
          <span class="item-preview">
            <strong>{{(chat.lastMessage || {}).senderId? getLastSender(chat.lastMessage.senderId).name : 'fulano'}}:</strong>
            {{(chat.lastMessage || {}).messageText?resolveLast(chat.lastMessage.messageText):'indefinido'}}
          </span>
        </v-list-item-content>

        <v-list-item-action class="item-info">
          <span class="item-time text-overline">{{setTime((chat.lastMessage || {}).creationTime || '')}}</span>
          <span class="item-count">{{chat.unread_count}}</span>
        </v-list-item-action>
      </v-list-item>
    </div>
    
  </v-list>
</template>


<style lang="scss" scoped>
@import '@design';

$sidebar-thin-width: 60px;

html, body {
  padding: 0;
  margin: 0;
  background-color: $background-color;
  color: #fff;
}

h3 {
  @include text(12px, 600, 1.1em, #fff, lowercase);
  letter-spacing: 0.5px;
  font-family: 'Courier New', Courier, monospace;
  color: white;
  margin: 16px 24px;
}

.chatTalks {
  width: 100%;
  height: 100%;
  background-color: $background-color;
  padding: 0 0 10px 0;
  // border: 1px solid red;

  .talks-header {
    @include flexbox(row, nowrap, center, space-between);
    height: 50px;
    width: 100%;
    border-bottom: 2px solid $line-color;
    padding: 4px 16px;

    span {
      width: 100%;
    }

    .talks-counter {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      min-width: 32px;
      height: 20px;
      border-radius: 20px;
      background-color: $blue-mono-4;
      margin: 0 0 0 8px;
      text-align: center;
      // border: 1px solid red;

      span {
        @include text(14px, 600, 1.1em, $blue-mono-2, lowercase);
      }
    }
  }

  .talks-body {
    width: 100%;
    height: 100%;
    max-height: 650px;
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
}

</style>