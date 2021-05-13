<script>
// import Layout from '@components/layout/company/main-visitant'

export default {
  page: {
    title: 'Page timeout',
    meta: [
      { name: 'description', content: 'The page timed out while loading.' },
    ],
  },
  components: {  },
}
</script>

<template>
  <h1 :class="$style.title">
    The page timed out while loading. Are you sure you're still connected to
    the Internet?
  </h1>
</template>

<style lang="scss" module>
.title {
  text-align: center;
}
</style>
