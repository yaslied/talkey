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
      {{'own: ' +own}}
      <div class="username" v-if="!own">{{message.name}}</div>
<!--      <div class="username" v-if="index == 0">{{message.user}}</div>-->
      <div style="margin-top: 5px"></div>
      <div class="content">
        <div v-if="message.type === 'TEXT'" v-html="message.text"></div>
        <chat-image v-if="message.type === 'IMAGE'" :imgsrc="message.image" @imageLoad="imageLoad"></chat-image>
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
    margin-bottom: 3px;
    border: 2px solid rgba(#131C21, 0.5);
    min-height: 40px;
  }
.own {
  text-align: right;
  border: 2px solid red;
  .content {
    //background-color: lightskyblue;
  }
}
</style>