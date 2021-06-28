<script>
  import Image from './Image.vue'
  import {authComputed, chatComputed} from "@state/helpers";

  export default {
    data () {
      return {}
    },
    props: {
      message: {
        type: Object,
        default: () => {},
      },
    },
    components: {
      'chat-image': Image
    },
    computed: {
      ...chatComputed,
      ...authComputed,
      username () {
        return this.chatCurrent?.username || 'fulano';
      },
      own(){
        return (this.message?.sender_id + '') === (this.currentUserId + '' );
      },
    },
    watch: {
      message(value, oldValue){
        console.log('this.usersLoadeds', this.allUsers);
      },
    },
    methods: {
      imageLoad () {
        // this.$emit('imageLoad')
      }
    }
  }
</script>

<template>
  <div>
    <div class="message"  :class="{own: own}">
<!--      <div class="username" v-if="index == 0">{{message.user}}</div>-->
      <div class="content">
        <div class="username" v-if="!own">{{message.name}}</div>
        <span v-if="message.type === 'TEXT'">{{message.text}}</span>
        <!-- <chat-image v-if="message.type === 'IMAGE'" :imgsrc="message.image" @imageLoad="imageLoad"></chat-image> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//@import '@design';
  span.emoji {
    font-size: 20px;
    vertical-align: middle;
    line-height: 2;
  }

  .message {
    margin-bottom: 8px;
    padding: 0;
    width: 100%;
    display: column;
    align-items: flex-start;
    justify-content: center;

    .content {
      background: rgba(#2B5580, .7);
      display: row;
      align-items: center;
      justify-content: flex-end;
      border: 1px solid rgba(#131C21, 0.2);
      border-radius: 10px 10px 10px 0;
      padding: 8px 16px;
      margin: 0 auto 0 0;
      min-height: 30px;
      width: fit-content;
      min-width: 150px;
      
      .username {
        font-size: 12px;
        font-weight: 500;
        color: #FFD717;
        letter-spacing: 0.5px;
        line-height: 1em;
        margin: 0 0 8px 0;
      }
      
      span {
        font-size: 16px;
        color: #fff;
        letter-spacing: 0.5px;
      }

    }
  }

  .own {
    text-align: right;
    justify-content: flex-start;
    align-items: flex-end;

    .content {
      background: rgba(#054280, .3) !important;
      align-items: center;
      border: 1px solid rgba(#131C21, 0.2);
      border-radius: 10px 10px 0 10px !important;
      min-height: 50px;
      margin: 0 0 0 auto;
      //background-color: lightskyblue;
      span {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        letter-spacing: 0.5px;
      }
    }
  }
</style>