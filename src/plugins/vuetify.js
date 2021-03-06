import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';

import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        anchor: '#8c9eff',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});

export default vuetify;


