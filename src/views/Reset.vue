<script>
import BaseInput from '@components/base-input';
export default {
  name: 'Reset',
  components: {
    BaseInput,
  },

  data(vm) {
    return {
      email: '',
      newPass: '',
      confirmPass: '',
      isReseting: 0,
    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    async startReset() {
      console.log('starting', {e: this.email});
      await this.delaying(1000);
      this.isReseting = 1;
    },

    async reset() {
      this.newPass = this.confirmPass = '';
      console.log('reseting', {new: this.newPass, confirm: this.confirmPass});
      await this.delaying(1000);
      this.isReseting = 0;
      this.clearForm();
    },

    clearForm() {
      this.email = this.newPass = this.confirmPass = '';
    },

    delaying(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
}
</script>

<template>
  <div class="app-page reset-page">

    <div class="reset-container">
      <div class="reset-container__logo-container">
        <img :src="require('@assets/icons/logo-icon.png')" alt="logo">
        <span class="brand-text text-title-3">talkey</span>
      </div>

      <div class="reset-container__form m-b-32">
        
        <span class="text-title-3">Recuperar Senha</span>
        <!-- <router-link class="encapslued-link link-1" to="/register">
          <span class="text-caption text-bolder">Não tem uma conta? Cadastre-se</span>
        </router-link> -->

        <BaseInput class="form-input" v-if="isReseting===0" label="email de recuperação" v-model="email"></BaseInput>

        <BaseInput class="form-input" v-if="isReseting===1" label="nova senha" v-model="newPass"></BaseInput>
        <BaseInput class="form-input" v-if="isReseting===1" label="confirmar nova senha" v-model="confirmPass"></BaseInput>

      </div>

      <div class="reset-container__actions">
        <button class="app-button button--primary" v-if="isReseting===0" @click="startReset">
          <span class="button-label text-body-1">Enviar</span>
        </button>
        <button class="app-button button--primary" v-else @click="reset">
          <span class="button-label text-body-1">Mudar Senha</span>
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

.reset-page {
  height: 100%;
  min-height: 100vh;
  width: 100%;
  @include flexbox(column, nowrap, center, center);
  color: #fff;

  .reset-container {
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
