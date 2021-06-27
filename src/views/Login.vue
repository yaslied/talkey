<script>
import { authMethods, authComputed } from '@state/helpers';

import BaseInput from '@components/base-input';

export default {
  name: 'Login',
  components: {
    BaseInput,
  },

  data() {
    return {
      tryingToLogin: false,
      error: null,

      username: 'bruno_mond3',
      password: '123mudar',
    }
  },
  beforeMount() {
    console.log('before mount FOUHASDOFLHAISDJFHLKASJDF')
  },

  computed: {
    ...authComputed,
  },

  watch: {

  },

  methods: {
    ...authMethods,

    async login() {
      console.log('logging', {e: this.username, p: this.password});
      this.tryingToLogin = true;
      this.error = null;

      const credentials = {
        username: this.username,
        password: this.password,
      };

      try {
        const result = await this.logIn(credentials);
        console.log('Login Retorno', result);
        this.$router.push({name: 'MainChat'});
        this.error = null;
      } catch (error) {
        console.error('Error ao Logar', error);
        this.error = error.message;
      }

      this.tryingToLogin = false;
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
        
        <span class="text-title-3">Fazer Login</span>
        <router-link class="encapslued-link link-1" to="/register">
          <span class="text-caption text-bolder">Não tem uma conta? Cadastre-se</span>
        </router-link>

        <BaseInput class="form-input" label="nome de usuário" v-model="username"></BaseInput>
        <BaseInput class="form-input last-input" label="senha" v-model="password"></BaseInput>

        <router-link class="encapslued-link link-2" to="/reset">
          <span class="text-caption text-bolder secondary-color">Esqueceu sua senha?</span>
        </router-link>

      </div>

      <div class="login-container__actions">
        <button class="app-button button--primary" @click="login">
          <span class="button-label text-body-1">Entrar</span>
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
      min-width: 250px;
      margin: 0 0 8px 0;
      text-align: left;

      .encapslued-link {
        text-decoration: none;

        span {
          color: $gray-shade-3;
          border-bottom: 1px solid $background-color;

          &:hover {
            color: $secondary-color;
            border-bottom: 1px solid $secondary-color;
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
        margin: 4px 0;

        font-family: 'Roboto Regular';
      }
    }

    &__actions {
      margin: 0 0 8px 0;

      .button--primary {
        min-width: 250px;
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
