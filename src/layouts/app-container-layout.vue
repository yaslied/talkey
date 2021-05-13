<template>
  <div class="app-container-layout">
    <div class="middle-container">
      <div class="middle-container__header">
        <slot name="middle-header"></slot>
      </div>
      <div class="middle-container__body">
        <slot name="middle-body"></slot>
      </div>
    </div>

    <div class="right-container" v-if="!rightHidden">
      <div class="right-container__header">
        <slot name="right-header"></slot>
      </div>
      <div class="right-container__body">
        <slot name="right-body"></slot>
      </div>
    </div>

</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'MainContainerLayout',
  components: {},

  props: {
    rightHidden: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@design';

$sidebar-thin-width: 60px;
$right-max-width: 300px;

$middle-header-max-height: 80px;
$right-header-max-height: 80px;

html, body {
  padding: 0;
  margin: 0;
  background-color: $background-color;
}

.app-container-layout {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  height: 100vh;
  overflow: hidden;


  .middle-container {
    @include flexbox(column, nowrap, flex-start, flex-start);
    width: 100%;
    height: 100%;
    flex: 1 1 0;

    &__header {
      height: $middle-header-max-height;
      width: 100%;
      border-bottom: 2px solid rgba($gray-shade-1, 0.5);
    }

    &__body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }
  }

  .right-container {
    @include flexbox(column, nowrap, flex-start, flex-start);
    width: 100%;
    max-width: $right-max-width;
    height: 100%;
    border-left: 2px solid rgba($gray-shade-1, 0.5);

    &__header {
      height: $middle-header-max-height;
      width: 100%;
      border-bottom: 2px solid rgba($gray-shade-1, 0.5);
    }

    &__body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }
  }
}

</style>
