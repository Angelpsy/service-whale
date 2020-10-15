import Vue from 'vue';
import '@/scss/variables.scss';
import Vuetify from 'vuetify/lib';
import '@/scss/overrides.scss';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1867C0',
      },
    },
  },
});
