<script>
// @ is an alias to /src
import MainContainer from '@src/layouts/app-container-layout';
import BaseInput from '@components/base-input';

export default {
  name: 'Contacts',
  components: {
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
  <div class="contacts">
    <MainContainer
      :left-hidden="true"
      :right-hidden="true"
    >
        
      <template v-slot:middle-header>
        <h3>middle-header content here, <br> using vue slots</h3>
      </template>

      <template v-slot:middle-body>
        <h3>chat-here</h3>
      </template>

    </MainContainer>
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

.contacts {
  width: 100%;
  height: 100%;
  background-color: $background-color;
}


</style>
