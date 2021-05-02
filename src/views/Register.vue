<script>
import BaseInput from '@components/base-input';
export default {
  name: 'Login',
  components: {
    BaseInput,
  },

  data(vm) {
    return {
      username: '',
      email: '',
      password: '',
    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    login() {
      console.log('logging', {e: this.email, p: this.password});
    },
  },
}
</script>

<template>
  <div class="app-page login-page">

    <div class="login-container">
      <div class="login-container__logo-container">
        <img :src="require('@assets/icons/logo-icon.png')" alt="logo">
        <span class="brand-text text-title-3">talkey</span>
      </div>

      <div class="login-container__form m-b-32">
        
        <span class="text-title-3 push-auto m-b-8">Criar Conta</span>
        
        <div class="uploader-container">
          <div class="placeholder-container">
            <img class="image-placeholder" :src="require('@assets/icons/camera-outline.png')">
          </div>
          <!-- <img src="" alt=""> -->
        </div>

        <BaseInput class="form-input" label="nome de usuário" type="1" v-model="username"></BaseInput>
        <BaseInput class="form-input" label="email" type="1" v-model="email"></BaseInput>
        <BaseInput class="form-input last-input" type="1" label="senha" v-model="password"></BaseInput>

      </div>

      <div class="login-container__actions">
        <button class="app-button button--primary" @click="login">
          <span class="button-label text-body-2">Cadastrar</span>
        </button>
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
@import '@design';

.app-page {
  background-color: $background-color;
  min-height: 100vh;
}

.login-page {
  height: 100%;
  min-height: 100vh;
  width: 100%;
  @include flexbox(column, nowrap, center, center);
  color: #fff;

  .login-container {
    @include flexbox(column, nowrap, center, flex-start);
    min-height: 150px;
    min-width: 400px;
    border: 1px solid $gray-shade-3;
    border-radius: 15px;
    padding: 32px 24px;

    &__logo-container {
      @include flexbox(column, nowrap, center, center);
      margin: 0 0 24px 0;
    }

    &__form {
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

    &__actions {
      margin: 16px 0 8px 0;

      .button--primary {
        min-width: 350px;
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
}
</style>
