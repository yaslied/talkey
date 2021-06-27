
<script>
  import Message from '@components/Chat/parts/Message.vue';
  import EmojiPicker from '@components/Chat/parts/EmojiPicker.vue';
  import {chatComputed} from "@state/helpers";
  
  // import * as firebase from 'firebase'
  export default {
    name: 'ChatMessager',
    data () {
      return {
        content: '',
        chatMessages: [],
        emojiPanel: false,
        currentRef: {},
        loading: false,
        totalChatHeight: 0
      }
    },
    props: [
      'id'
    ],
    mounted () {
      this.loadChat()
      // this.$store.dispatch('loadOnlineUsers')
    },
    components: {
      'message': Message,
      'emoji-picker': EmojiPicker,
    },
    computed: {
      ...chatComputed,
      messages () {
        return this.chatMessages
      },
      username () {
        return this.$store.getters?.user?.username
      },
      onNewMessageAdded () {
        const that = this
        let onNewMessageAdded = function (snapshot, newMessage = true) {
          let message = snapshot.val()
          message.key = snapshot.key
          /*eslint-disable */
          var urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
          /*eslint-enable */
          message.content = message.content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
          message.content = message.content.replace(urlPattern, "<a href='$1'>$1</a>")
          if (!newMessage) {
            that.chatMessages.unshift(that.processMessage(message))
            that.scrollTo()
          } else {
            that.chatMessages.push(that.processMessage(message))
            that.scrollToEnd()
          }
        }
        return onNewMessageAdded
      }
    },
    watch: {
      '$route.params.id' (newId, oldId) {
        this.currentRef.off('child_added', this.onNewMessageAdded)
        this.loadChat()
      }
    },
    methods: {
      loadChat () {
        this.totalChatHeight = this.$refs.chatContainer.scrollHeight
        this.loading = false
        if (this.id !== undefined) {
          this.chatMessages = []
          let chatID = this.id
          this.currentRef = firebase.database().ref('messages').child(chatID).child('messages').limitToLast(20)
          this.currentRef.on('child_added', this.onNewMessageAdded)
        }
      },
      onScroll () {
        let scrollValue = this.$refs.chatContainer.scrollTop
        const that = this
        if (scrollValue < 100 && !this.loading) {
          this.totalChatHeight = this.$refs.chatContainer.scrollHeight
          this.loading = true
          let chatID = this.id
          let currentTopMessage = this.chatMessages[0]
          if (currentTopMessage === undefined) {
            this.loading = false
            return
          }
          firebase.database().ref('messages').child(chatID).child('messages').orderByKey().endAt(currentTopMessage.key).limitToLast(20).once('value').then(
            function (snapshot) {
              let tempArray = []
              snapshot.forEach(function (item) {
                tempArray.push(item)
              })
              if (tempArray[0].key === tempArray[1].key) return
              tempArray.reverse()
              tempArray.forEach(function (child) { that.onNewMessageAdded(child, false) })
              that.loading = false
            }
          )
        }
      },
      processMessage (message) {
        /*eslint-disable */
        var imageRegex = /([^\s\']+).(?:jpg|jpeg|gif|png)/i
        /*eslint-enable */
        if (imageRegex.test(message.content)) {
          message.image = imageRegex.exec(message.content)[0]
        }
        var emojiRegex = /([\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{2934}-\u{1f18e}])/gu
        if (emojiRegex.test(message.content)) {
          message.content = message.content.replace(emojiRegex, '<span class="emoji">$1</span>')
        }
        return message
      },
      async sendMessage () {
        if (this.content !== '' && this.chatCurrentId) {
          const msg = {text: this.content, type: 'TEXT'};
          if (this.chatCurrent?.talkType === 'GROUP'){
            await this.$store.dispatch('chat/sendMessage', {msg: msg, userId: null, chatId: this.chatCurrentId, toGroup: true});
          } else {
            await this.$store.dispatch('chat/sendMessage', {msg: msg, userId: this.chatCurrent?.users?.[0]?.userId, chatId: this.chatCurrentId, toGroup: false});
          }
          this.content = ''
        }
      },
      scrollToEnd () {
        this.$nextTick(() => {
          var container = this.$el.querySelector('.messages-container')
          container.scrollTop = container.scrollHeight
        })
      },
      scrollTo () {
        this.$nextTick(() => {
          let currentHeight = this.$refs.chatContainer.scrollHeight
          let difference = currentHeight - this.totalChatHeight
          var container = this.$el.querySelector('.messages-container')
          container.scrollTop = difference
        })
      },
      addEmojiToMessage (emoji) {
        this.content += emoji.value
      },
      toggleEmojiPanel () {
        this.emojiPanel = !this.emojiPanel
      }
    }
  }
</script>

<template>
  <div class="chatMessager">
    <div class="messages-container" v-on:scroll="onScroll" ref="chatContainer" >
      <message class="message" :messages="messages" @imageLoad="scrollToEnd"></message>
    </div>
    
    <emoji-picker :show="emojiPanel" @close="toggleEmojiPanel" @click="addEmojiToMessage"></emoji-picker>
    
    <div class="typer-container">
      <input type="text" placeholder="type here..." v-on:keyup.enter="sendMessage" v-model="content">
      <div class="emoji-panel">
        <v-btn icon class="blue--text button--emoji" @click="toggleEmojiPanel">
          <v-icon class="button-icon text-white">mdi-emoticon-outline</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.scrollable {
  overflow-y: auto;
  height: 90vh;
}

.chatMessager {
  background-color: $background-color;
  // border: 1px solid red;
}

.messages-container {
  box-sizing: border-box;
  height: calc(100vh - 9.5rem);
  overflow-y: auto;
  padding: 10px;
  background-color: transparent;

  .message {
    margin-bottom: 3px;

    .own {
      text-align: right;

      .content {
        background-color: lightskyblue;
      }
    }
  }

  .username {
    font-size: 18px;
    font-weight: bold;
  }

  .content {
    padding: 8px;
    background-color: lightgreen;
    border-radius: 10px;
    display:inline-block;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
    max-width: 50%;
    word-wrap: break-word;

    @include for-phone-only {
      max-width: 60%;
    }
  }
}

.typer-container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 4.9rem;
  width: 100%;
  background-color: $bg-mono-2;
  box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
    // border: 1px solid red;

  input[type=text] {
    width: 100%;
    // max-width: 400px;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    font-family: 'Roboto', courier, monospace;
    padding: 8px;
    color: #fff;
  }

  .emoji-panel {
    display: inline-flex;
    justify-content: center;
    min-width: 50px;
    // border: 1px soild red;

    .button--emoji {
      .button-icon {
        color: #fff;
      }
    }
  }
}
  
</style>