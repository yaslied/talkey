<script>
// @ is an alias to /src
import MainLayout from '@src/layouts/app-main-layout';
import MainContainer from '@src/layouts/app-container-layout';
import BaseInput from '@components/base-input';

export default {
  name: 'Home',
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
  <div class="home">
    <MainLayout>
      <MainContainer
        :right-hidden="false"
      >
        
        <template v-slot:middle-header>
          <h3>middle-header content here, <br> using vue slots</h3>
        </template>

        <template v-slot:middle-body>
          <div class="profile-component">

            <div class="uploader-container m-b-32">
              <div class="placeholder-container">
                <img class="image-placeholder" :src="require('@assets/icons/camera-outline.png')">
              </div>
              <span class="text-title-3 push-auto m-b-8">{{username}}</span>
              <!-- <img src="" alt=""> -->
            </div>

            <div class="form">
              <BaseInput class="form-input" label="nome de usuário" type="1" v-model="username"></BaseInput>
              <BaseInput class="form-input" label="email" type="1" v-model="email"></BaseInput>

              <BaseInput class="form-input m-t-32" type="1" label="senha antiga" v-model="oldPassword"></BaseInput>
              <BaseInput class="form-input" type="1" label="nova senha" v-model="password"></BaseInput>
            </div>

            <div class="actions">
              <button class="app-button button--primary" @click="updateProfile">
                <span class="button-label text-body-2">Salvar</span>
              </button>
            </div>

          </div>
        </template>

        <template v-slot:right-header>
          <h3>right-header content here,<br> using vue slots</h3>
        </template>

        <template v-slot:right-body>
          <h3>right-body content here,<br> using vue slots</h3>
          <h3 class="m-t-64">don`t forget responsive mixins</h3>
        </template>

      </MainContainer>
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

.home-page {
  width: 100%;
  height: 100vh;
  background-color: $background-color;
}

.profile-component {
  @include flexbox(column, nowrap, center, flex-start);
  height: 100%;
  max-width: 350px;
  overflow: hidden;
  border-radius: 6px;
  padding: 32px;
  margin: 32px auto;

  .uploader-container {
    @include flexbox(row, nowrap, flex-end, flex-start);
    width: 100%;
    margin: 8px 0 -8px 0;
    
    .placeholder-container {
      @include flexbox(column, nowrap, center, center);
      height: 120px;
      width: 120px;
      background-color: $bg-mono-2;
      border: 1px solid $bg-mono-2;
      border-radius: 50%;
      margin: 0 auto;

      transition: all .3s ease-in;

      &:hover {
        cursor: pointer;
        border: 1px solid $primary-color;
        box-shadow:  0 0 1px 3px rgba($primary-color, .5);
      }

      .image-placeholder {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    }

    & > span {
      @include text(24px, 600, 1.1em, #fff, lowercase);
      letter-spacing: 0.5px;
      font-family: 'Courier New', Courier, monospace;
    }
  }

  .form {
    @include flexbox(column, nowrap, flex-start, center);
    min-width: 350px;
    margin: 0 0 8px 0;
    text-align: left;

    .uploader-container {
      width: 100%;
      margin: 8px 0 -8px 0;
      
      .placeholder-container {
        @include flexbox(column, nowrap, center, center);
        height: 120px;
        width: 120px;
        background-color: $bg-mono-2;
        border-radius: 50%;
        margin: 0 auto;

        .image-placeholder {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
      }
    }

    .link-1 {
      margin: 8px 0 8px 0;
    }

    .link-2 {
      margin: 16px 0 4px auto;
    }

    .form-input {
      min-height: 35px;
      width: 100%;
      max-width: 350px;
      margin: 4px 0;

      font-family: 'Roboto Regular';
    }
  }

  .actions {
    width: 100%;
    margin: 40px 0 8px 0;

    .button--primary {
      min-width: 140px;
      border: none !important;
      margin-left: auto;
      background-color: rgba($blue-mono-3, 0.8);

      &:hover {
        background-color: rgba($blue-mono-3, 0.4);
      }

      .button-icon,
      .button-label {
        color: #fff;
      }
    }
  }

}

</style>
