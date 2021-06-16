<script>
 // import StringUtils from '@common/StringUtils'
 // import {EventStatus, ProcedureType, Accommodation} from "@common/status";

export default {
  name: 'BaseInput',
  components: {},
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    label: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number, Object],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    fixOnStart: {
      type: Boolean,
    },
    color: {
      type: [String],
      default: 'white',
    },
    block: {
      type: Boolean,
      default: false,
    },
    fineLines: {
      type: Boolean,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data(vm) {
    return {
      internalLazyValue: (()=>{
        return vm.value;
      })(),
      internalErrorMessages: [],
      hasInput: false,
      inputFocused: false,

      visibility: false,
      typeMirror: 'text',

      fineLinesShadowShadowShadow: '0 0 0 var(--soft-background)',
      thickLinesShadow: '$button-shadow',
    }
  },
  computed: {
    internalValue: {
      get() {
        return this.internalLazyValue;
      },
      set(val) {
        this.updateInternalLazyValue(val, true);
      }
    },
  },
  watch: {
    value(val) {
      this.updateInternalLazyValue(val, true);
      // this.$emit('input', this.internalValue);
    },
  },
  mounted: async function() {
    this.typeMirror = this.type;
  },
  beforeDestroy: function() {
  },
  methods: {
    reset () {
      this.hasInput = false;
      this.internalErrorMessages = [];
      this.updateInternalLazyValue(null, true);
      this.removeFocus();
    },

    resetValidation () {
      this.hasInput = false;
      this.internalErrorMessages = [];
    },

    validate (force=false) {
      this.internalErrorMessages = [];
      for (const rule of this.rules) {
        const result = typeof rule === 'function' ? rule(this.internalLazyValue) : rule;
        if (typeof result === 'string') {
          this.internalErrorMessages.push(result);
        }
      }
      if (force) {
        this.hasInput = true;
      }
      return this.internalErrorMessages.length === 0;
    },

    /**
     * Formato dos dados de saída
     */
    toModel(value) {
      // return parseFloat(value);
    },
    removeFocus() {

    },
    /**
     * Alterar esse método para manter a consistência do seu dado interno (internalLazyValue)
     * @param value
     * @param emit
     */
    updateInternalLazyValue(value, emit=false) {
      // console.log('input value', value);

      if(!value) {
        value = '';
      }
      // value = parseFloat(value);

      if(value===null && this.internalLazyValue===null) {
        // console.log('here2')
        return;
      }
      if (value === null || this.internalLazyValue === null || this.internalLazyValue !== value) {
        // console.log('here3')
        this.resetValidation();
        this.internalLazyValue = value;
        if(emit) {
          this.$emit('input', this.internalLazyValue);
        }
      }
    },

    clicked() {
      this.inputFocused = true;
    },

    changeVisibility() {
      this.visibility = !this.visibility;
      this.typeMirror = this.visibility?'text':'password';
    },

  },
}
</script>

<template>
  <div class="textField-component" :class="{'input-block': block}">
    <label v-if="!placeholder" class="label">{{label}}</label>

    <input
      :value="internalValue"
      class="input"
      :placeholder="placeholder"
      :type="typeMirror"
      :style="`color: ${color} !important`"
      :disabled="disabled"
      @input="updateInternalLazyValue($event.target.value, true)"
    >
    <button v-if="type==='password'" class="hidden-pass" @click="changeVisibility">
      <!-- <img class="icon">{{true?'mdi-eye-outline':'mdi-eye-off-outline'}}</img> -->
      <i class="eye-icon" :class="!visibility?'visibility-on':'visibility-off'">
        <div class="slash"></div>
      </i>
    </button>

  </div>
</template>


<style lang="scss" scoped>
@import '@design';

html {
  box-sizing: border-box;
}

* {
  box-sizing: inherit;
  &:before,
  &:after {
    box-sizing: inherit;
  }
}

body {
  font-family: 'Inter', Arial, sans-serif;
}

@supports(-webkit-appearance: none) or (-moz-appearance: none) {

  .input-block {
    min-width: 100% !important;
    flex-grow: 1;

    input {
      width: 100%;
    }
  }

  .textField-component {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: fit-content;
    position: relative;
    max-height: 65px !important;
    // margin: 4px 0;

    $label-color: #57ABFF;
    .label {
      color: $label-color;
      font-size: 13px;
      font-weight: 500;
      line-height: 21px;
      letter-spacing: 0.3px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      margin: 0 0 4px 0;
      text-transform: normal;
    }

    $button-shadow: 0 0 0 1px #e0e0e0, 0 2px 4px 0 rgba(0, 0, 0, 0.07),
  0 1px 1.5px 0 rgba(0, 0, 0, 0.05);

    input[type='text'], input[type='password'] {
      --active: #275EFE;
      --active-inner: #fff;
      --focus: 2px rgba(#FFD717, .4);
      --border: #263344;
      --border-hover: #FFA40A;
      --background: #42484F;
      --soft-background: #f6f8f9;
      --disabled: #f6f8f9;
      --disabled-inner: #E1E6F9;
      -webkit-appearance: none;
      -moz-appearance: none;
      height: 40px;
      max-height: 40px !important;
      min-width: 64px;
      width: 100%;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      padding: 8px 16px;
      cursor: pointer;
      border-radius: 6px;
      border: 1px solid var(--border);
      // box-shadow: 0 0 0 var(--soft-background);
      // box-shadow: $button-shadow;
      box-shadow: 0 1px 2px -2px #9098A9;
      background: var(--b, var(--background));
      transition: background .3s, border-color .3s, box-shadow .2s;

      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: 0.5px;
      color: #f6f8f9;

      &:after {
        content: '';
        display: block;
        left: 0;
        top: 0;
        position: absolute;
        transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
      }

      &::placeholder {
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.5px;
        color: #2b3342;
      }

      &:checked {
        --b: var(--active);
        // --bc: var(--active);
        --d-o: .3s;
        --d-t: .6s;
        --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
        --bc: var(--border-hover);
      }
      &:disabled {
        --b: var(--disabled);
        cursor: not-allowed;
        opacity: .9;
        border: 1px solid #f6f8f9;
        box-shadow: $button-shadow;
        color: #2b3342;
        &:checked {
          --b: var(--disabled-inner);
          --bc: var(--border);
        }
        & + label {
          cursor: not-allowed;
        }
      }
      &:hover {
        &:not(:checked) {
          &:not(:disabled) {
            border: 1px solid var(--border-hover);
            box-shadow: 0 0 0 var(--focus);
          }
        }
      }
      &:focus {
        box-shadow: 0 0 0 var(--focus);
        border: 1px solid var(--border-hover);
      }
    }

    input[type='password'] {
      &::-webkit-input-placeholder {
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 1px;
        color: #f6f8f9;
      }
    }

    .hidden-pass {
      height: 24px;
      width: 24px;
      background-color: #42484F;
      box-shadow: none !important;
      outline: none;
      position: absolute;
      right: 0;
      bottom: 4px;
    }

    .eye-icon {
      position: relative;
      display: block;
      transform: scale(var(--ggs,1));
      width: 24px;
      height: 18px;
      border-bottom-right-radius: 100px;
      border-bottom-left-radius: 100px;
      overflow: hidden;
      box-sizing: border-box;

      &::after,
      &::before {
        content: "";
        display: block;
        border-radius: 100px;
        position: absolute;
        box-sizing: border-box;
      }

      &::after {
        top: 2px;
        box-shadow:
            inset 0 -8px 0 2px,
            inset 0 0 0 2px;
        width: 24px;
        height: 24px;
      }
      &::before {
        width: 8px;
        height: 8px;
        border: 2px solid;
        bottom: 4px;
        left: 8px;
      }
    }

    .visibility-on {
      .slash {
        display: none;
      }
    }

    .visibility-off {
      .slash {
        box-sizing: border-box;
        position: relative;
        display: block;
        width: 24px;
        height: 24px;
        // border-top: 2px solid;
        transform: scale(var(--ggs,1));
        // border-right: 2px solid;

        &::after {
          content: "";
          display: block;
          box-sizing: border-box;
          position: absolute;
          width: 24px;
          height: 2px;
          background: currentColor;
          transform: rotate(-60deg);
          top: 12px;
          right: 2px;
          z-index: 10;
        }
      }
    }

  }
}

</style>
