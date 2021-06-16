<script>
  export default {
    data () {
      return {}
    },
    props: {
      emoji: ''
    },
    methods: {
      onEmojiClick () {
        this.$emit('click', this.emoji)
      }
    }
  }
</script>

<template>
  <span @click="onEmojiClick">{{emoji.value}}</span>
</template>
