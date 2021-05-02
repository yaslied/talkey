<script>
export default {

  props: {
    label: {
      type: String,
      default: 'label',
    },
    type: {
      type: [String, Number],
      default: 1,
    },
  },

  data() {
    return {
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
      console.log('logging');
    },
  },
}
</script>

<template>
  <div class="input-swipper">
    <div class="input__group--type-1" v-if="type==1">
      <input type="input" class="input-field" placeholder="Name" name="name" id='name' required />
      <label for="name" class="input-label">{{label}}</label>
    </div>

    <div class="input__group--type-2" v-if="type==2">
      <input class="input-field" type="email" :placeholder="label">
      <button class="input-button" type="submit"><i class="icon ion-android-arrow-forward"></i></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@design';

  $primary: #0a84ff;
  $secondary: #FFD717;
  $white: #fff;
  $gray: #9b9b9b;

  .input__group--type-1 {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 100%;

    .input-field {
      font-family: inherit;
      width: 100%;
      border: 0;
      border-bottom: 2px solid $gray;
      outline: 0;
      font-size: 1.2rem;
      line-height: 1.2rem;
      color: $white;
      padding: 7px 0;
      background: transparent;
      transition: border-color 0.2s;

      &::placeholder {
        color: transparent;
      }

      &:placeholder-shown ~ .input-label {
        font-size: 1rem;
        cursor: text;
        top: 20px;
      }
    }

    .input-label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: .8rem;
      color: $gray;
    }

    .input-field:focus {
      ~ .input-label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: .8rem;
        color: $primary;
        font-weight:600;    
      }
      padding-bottom: 6px;  
      font-weight: 700;
      border-width: 3px;
      border-image: linear-gradient(to right, $primary,$secondary);
      border-image-slice: 1;
    }
    /* reset input */
    .input-field{
      &:required,&:invalid { box-shadow:none; }
    }
  }

  

  //second style
  $input-background: rgba(#131C21, .9);
  // $input-background: rgba(57, 63, 84, 0.8);
  $input-text-inactive: #7881A1;
  $input-text-active: #BFD2FF;

  %input-reset { border-style: none; background: transparent; outline: none; }
  %button-reset { padding: 0; background: none; border: none; outline: none; }

  // gradient animation
  @keyframes gradient { 
    0%{background-position:0 0}
    100%{background-position:100% 0}
  }

  .input__group--type-2 {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    border-radius: 6px;
    padding: 4px 8px;
    // padding: 1.4rem 2rem 1.6rem;
    background: $input-background;
    &:after {
      content: "";
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 0px;
      z-index: 999;
      height: 2px;
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      background-position: 0% 0%;
      background: linear-gradient(to right, #B294FF, #57E6E6, #FEFFB8, #57E6E6, #B294FF, #57E6E6);
      background-size: 500% auto;
      animation: gradient 3s linear infinite;
    }

    .input-field {
      @extend %input-reset;
      flex-grow: 1;
      color: $input-text-active;
      font-size: 1.8rem;
      line-height: 2.4rem;
      vertical-align: middle;
      &::-webkit-input-placeholder {
        color: $input-text-inactive;
      }
    }

    .input-button {
      @extend %button-reset;
      color:  $input-text-inactive;
      font-size: 2.4rem;
      line-height: 2.4rem;
      vertical-align: middle;
      transition: color .25s;
      &:hover {
        color: $input-text-active;
      }
    }
  }

</style>