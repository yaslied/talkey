<script>
// @ is an alias to /src
import MainLayout from '@src/layouts/app-main-layout';
import MainContainer from '@src/layouts/app-container-layout';
import BaseInput from '@components/base-input';

import Chats from '@components/Chat/parts/Chats.vue';
import Template from './template.vue';

export default {
  name: 'MainChat',
  components: {
    MainLayout,
    MainContainer,
    BaseInput
  },

  data() {
    return {
      username: 'Fulano de Tal',
      email: 'emaildefulano@detal.com.br',

      oldPassword: '********',
      password: '#######',
    }
  },

  methods: {
    updateProfile() {
      console.log('updating');
    }
  }
}
</script>


<template>
  <div class="chat-view">
    <MainLayout>

      <template v-slot:side></template>

      <template v-slot:container>
        <MainContainer
          :right-hidden="false"
        >
          
          <template v-slot:middle-header>
            <h3>middle-header content here, <br> using vue slots</h3>
          </template>

          <template v-slot:middle-body>
            <h3>middle-here</h3>
          </template>

          <template v-slot:right-header>
            <h3>right-header content here,<br> using vue slots</h3>
          </template>

          <template v-slot:right-body>
            <h3>right-body content here,<br> using vue slots</h3>
            <h3 class="m-t-64">don`t forget responsive mixins</h3>
          </template>

        </MainContainer>
      </template>

    </MainLayout>
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

.chat-view {
  width: 100%;
  height: 100vh;
  background-color: $background-color;
}

</style>

