<script>
import { authMethods, authComputed } from '@state/helpers';

import BaseInput from '@components/base-input';

export default {
  name: 'Login',

  components: {
    BaseInput,
  },

  data(vm) {
    return {
      tryingToRegister: false,
      error: null,

      username: '',
      email: '',
      password: '',

      files: [],
      selectedFile: null,
      isSelecting: false,
    }
  },

  computed: {
    ...authComputed,

  },

  watch: {

  },

  methods: {
    ...authMethods,

    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true });
      // console.log('clicked', this.$refs.uploader);

      this.$refs['uploader'].click();
    },

    onFileChanged(e) {
      this.selectedFile = e.target.files[0]
      
    },

    async signUp() {
      console.log('logging', {e: this.email, p: this.password});
      this.tryingToRegister = true;
      this.error = null;

      const credentials = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      try {
        const result = await this.register(credentials);
        console.log('retorno', result);
        this.$router.push({name: 'MainChat'});
        this.error = null;
      } catch (error) {
        console.error('Error ao Registrar', error);
        this.error = error.message;
      }

      this.tryingToRegister = false;
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
        
        <div class="uploader-container m-b-24">
          <button class="placeholder-container" @click="onButtonClick">
            <img class="image-placeholder" :src="require('@assets/icons/camera-outline.png')">
          </button>
          <!-- <v-file-input
            hide-input
            ref="uploader"
            class="file-input"
            v-model="selectedFile"
            accept="image/*"
            prepend-icon="mdi-paperclip"
            color="#fff"
          ></v-file-input> -->
          <input
            ref="uploader"
            class="file-input"
            type="file"
            accept="image/*"
            @change="onFileChanged"
          >
          <!-- <img src="" alt=""> -->
        </div>

        <BaseInput class="form-input" label="nome de usuário" v-model="username"></BaseInput>
        <BaseInput class="form-input" label="email" v-model="email"></BaseInput>
        <BaseInput class="form-input last-input" label="senha" v-model="password"></BaseInput>

      </div>

      <div class="login-container__actions">
        <button class="app-button button--primary" @click="signUp">
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

          &:hover {
            cursor: pointer;
            border: 1px solid $blue-mono-3;
            box-shadow:  0 0 1px 3px rgba($blue-mono-2, .3);
          }

          .image-placeholder {
            width: 24px;
            height: 24px;
            object-fit: contain;
          }
        }

        .file-input {
          visibility: hidden;
          height: 0;
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
        width: 100%;
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
