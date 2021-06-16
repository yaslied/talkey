<template>
  <div class="app-main-layout">
    <div class="layout-sidebar">
      <slot name="side"></slot>
    </div>

    <div class="layout-container">
      <slot name="container"></slot>
    </div>

</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'MainLayout',
  components: {
  },
}
</script>

<style lang="scss" scoped>
@import '@design';

$sidebar-thin-width: 70px;

html, body {
  padding: 0;
  margin: 0;
  background-color: $background-color;
}

.app-main-layout {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  height: 100vh;
  overflow: hidden;

  .layout-sidebar {
    width: $sidebar-thin-width;
    height: 100%;
    border-right: 2px solid rgba($gray-shade-1, 0.5);
  }

  .layout-container {
    width: 100%;
    height: 100%;
  }
}

</style>
