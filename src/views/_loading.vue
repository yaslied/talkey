<script>
// import Layout from '@components/layout/company/main-visitant'

export default {
  page: {
    title: 'Loading page...',
    meta: [{ name: 'description', content: 'Loading page...' }],
  },
  components: {},
}
</script>

<template>
  <!-- <Layout>
    
  </Layout> -->
  <Transition appear>
      <BaseIcon :class="$style.loadingIcon" name="sync" spin />
    </Transition>
</template>

<style lang="scss" module>
@import '@design';

.loadingIcon {
  // @extend %typography-xxlarge;

  display: block;
  margin: 0 auto;

  // stylelint-disable-next-line selector-class-pattern
  &:global(.v-enter-active) {
    transition: opacity 1s;
  }
  // stylelint-disable-next-line selector-class-pattern
  &:global(.v-enter) {
    opacity: 0;
  }
}
</style>
