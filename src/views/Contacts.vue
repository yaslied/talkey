<script>
// @ is an alias to /src
import { chatMethods, chatComputed } from '@state/helpers';

import MainContainer from '@src/layouts/app-container-layout';

import BaseAvatar from '@src/components/BaseAvatar.vue';
import BaseInput from '@components/base-input';

export default {
  name: 'Contacts',
  components: {
    MainContainer,
    BaseAvatar,
    BaseInput,
  },

  data() {
    return {
      isLoading: false,
      error: null,

      currentSearch: '',

      contactsList: [],

      blockedList: [],

      listBackup: [],
    }
  },

  mounted() {
    this.contactsList = this.chatContacts;
    this.blockedList = this.chatContactsBlocked;
  },

  computed: {
    ...chatComputed,

    hasContacts() {
      return this.contactsList.length > 0;
    },

    contactsView: {
      get() {
        return this.contactsList;
      },
      set(value) {
        this.contactsList = value;
      }
    },

    hasBlockeds() {
      return this.blockedList.length > 0;
    },

    blockedView: {
      get() {
        return this.blockedList;
      },
      set(value) {
        this.blockedList = value;
      }
    },
  },

  watch: {
    chatContacts(value) {
      console.log('change chatContacts', value);
      this.contactsList = value;
    },

    chatContactsBlocked(value) {
      console.log('change chatContactsBlocked', value);
      this.blockedList = value;
    },
  },

  methods: {
    ...chatMethods,

    reloadList() {
      this.contactsList = this.chatContacts;
    },

    updateProfile() {
      console.log('updating');
    },

    search() {
      if(this.listBackup.length === 0) {
        this.listBackup = this.contactsView;
        // console.log('backup', this.listBackup);
      }
      
      if(!this.currentSearch || this.currentSearch.length === 0) {
        // console.log('recover')
        this.contactsView = this.listBackup;
        return;
      }

      var self = this;
      let find = Array.from(this.contactsView.filter(function(el){return el.name.toLowerCase().indexOf(self.currentSearch.toLowerCase())>=0;}));
      // console.log('find', find);
      this.contactsView = find;
    },

    async setCurrent(el, user) {
      // TODO HERE
      console.log('set current:', {e: el, u: user});
      try {
        await this.setChatCurrent(user);
      } catch (err) {
        console.error('Error ao bloquear', err);
        this.error = err;
      }
    },

    async blockContact(user) {
      // TODO HERE
      try {
        await this.blockChatContact(user);
        // this.reloadList();
      } catch (err) {
        console.error('Error ao bloquear', err);
        this.error = err;
      }
    },

    async unblockContact(user) {
      try {
        await this.unblockChatContact(user);
        // this.reloadList();
      } catch (err) {
        console.error('Error ao desbloquear', err);
        this.error = err;
      }
    },
  }
}
</script>


<template>
  <div class="contacts-page">
    <MainContainer
      :left-hidden="true"
    >
        
      <template v-slot:middle-header>
        <div class="contacts-header">
          <span class="text-big-title text-bolder text-gray">Contatos</span>
        </div>
      </template>

      <template v-slot:middle-body>
        <div class="contacts-container">

          <div class="contacts-finder">
            <input type="text" placeholder="pesquisar contatos" @input="search" v-model="currentSearch">
          </div>

          <div class="contacts-list">
            <div v-if="!hasContacts" class="list--empty">
              <v-icon class="empty-icon" small>mdi-timer-sand-empty</v-icon>
              <span class="text-body-3 text-bold text-gray">sem contatos</span>
            </div>

            <div v-else class="list--loaded">
              <div class="list-header">
                <span class="text-body-3 text-bolder text-gray">Contatos:</span>
              </div>
              
              <div class="list-item"
                v-for="(contact, index) in contactsView"
                :key="`contact-item-${index}`"
              >

                <div class="avatar-content">
                  <BaseAvatar
                  class="avatar"
                  :src="contact.src"
                  :name="contact.name"
                  ></BaseAvatar>
                </div>
                
                <v-list-item-content class="item-content">
                  <span class="item-name">{{contact.name?contact.name:'indefinido'}}</span>
                </v-list-item-content>

                <div class="item-action">
                  <v-btn
                    class="action-button"
                    icon
                    @click="setCurrent($event, contact)"
                  >
                    <v-icon class="button-icon" small>mdi-message-outline</v-icon>
                  </v-btn>

                  <v-btn
                    class="action-button"
                    icon
                    @click="blockContact(contact)"
                  >
                    <v-icon class="button-icon" medium>mdi-account-cancel-outline</v-icon>
                  </v-btn>
                </div>

              </div>
            </div>
          </div>

          <div class="blocked-list">
            <div v-if="!hasBlockeds" class="list--empty">
              <v-icon class="empty-icon" small>mdi-block-helper</v-icon>
              <span class="text-body-3 text-bold text-gray">sem contatos bloquados</span>
            </div>

            <div v-else class="list--loaded">
              <div class="list-header">
                <span class="text-body-3 text-bolder text-gray">Contatos Bloqueados:</span>
              </div>

              <div class="list-item"
                v-for="(blocked, index) in blockedView"
                :key="`contact-item-${index}`"
              >

                <div class="avatar-content">
                  <BaseAvatar
                  class="avatar"
                  :src="blocked.src"
                  :name="blocked.name"
                  ></BaseAvatar>
                </div>
                
                <v-list-item-content class="item-content">
                  <span class="item-name">{{blocked.name?blocked.name:'indefinido'}}</span>
                </v-list-item-content>

                <div class="item-action">
                  <v-btn
                    class="action-button"
                    icon
                    @click="unblockContact(blocked)"
                  >
                    <v-icon class="button-icon" medium>mdi-account-reactivate-outline</v-icon>
                  </v-btn>
                </div>

              </div>
            </div>

          </div>

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

.contacts-page {
  width: 100%;
  height: 100%;
  background-color: $background-color;

  .contacts-header {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;

    height: 100%;
    padding: 8px 16px;

    // border: 1px solid red;
  }

  .contacts-finder {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    bottom: 0;
    height: 4rem;
    width: 100%;
    background-color: $bg-mono-3;
    box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);

    input[type=text] {
      width: 100%;
      // max-width: 400px;
      height: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 1rem;
      font-family: 'Roboto', courier, monospace;
      padding: 8px 16px;
      color: #fff;
    }
  }

  .contacts-container {
    @include flexbox(column, nowrap, flex-start, flex-start);
    width: 100%;
    height: 100%;

    .contacts-list {
      width: inherit;
      height: 50%;
      min-height: 200px;
      max-height: 400px;
      overflow-y: scroll;
      // border: 1px solid red;
    }

    .blocked-list {
      width: inherit;
      height: 50%;
      min-height: 200px;
      max-height: 400px;
      overflow-y: scroll;
      margin: 40px 0 0 0;
      // border: 1px solid red;
    }
  }

  .list--empty {
    width: 100%;
    height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    .empty-icon {
      color: $gray-scale-2;
      margin: 0 16px 0 0;
    }
  }

  .list--loaded {
    width: 100%;
    max-height: 65px;

    .list-header {
      padding: 8px 16px;
      margin: 0;
      border-bottom: 2px solid $line-color;
    }

    .list-item {
      @include flexbox(row, nowrap, center, flex-start);
      min-height: 60px;
      max-height: 65px;
      border-bottom: 1px solid $line-color;
      background: rgba($background-color, .9);
      // border: 1px solid red;
      padding: 4px 8px;

      &:hover {
        cursor: default;
        background: rgba(black, .1);
      }

      .avatar-content {
        margin: 0 16px 0 0;
        // border: 1px solid red;
      }

      .item-content {
        @include flexbox(column, nowrap, flex-start, center);
        height: 100%;
        // border: 1px solid red;

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

      .item-action {
        @include flexbox(row, nowrap, center, space-between);
        // min-width: 120px;
        height: 100%;

        .item-time {
          color: $gray-shade-1;
        }

        .action-button {
          margin: 0 8px;
          // border: 1px solid red;

          .button-icon {
            color: $secondary-color;
          }
        }

      }
    }

  }

}


</style>
