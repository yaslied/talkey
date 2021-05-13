<script>
import Layout from '@components/layout/company/main-visitant'

export default {
  page: {
    title: '404',
    meta: [{ name: 'description', content: '404' }],
  },
  components: { Layout },
  props: {
    resource: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <Layout>
    <h1 :class="$style.title">
      404
      <div v-if="resource">
        {{ resource }}
      </div>
      Not Found
    </h1>
  </Layout>
</template>

<style lang="scss" module>
.title {
  text-align: center;
}
</style>
