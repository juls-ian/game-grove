import './assets/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// Toasts
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as icons from 'vuetify/iconsets/mdi';
// Firebase
import { AUTH } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
// Masonry
import { VueMasonryPlugin } from 'vue-masonry';

const vuetify = createVuetify({
  components,
  directives,
  icons,
});

// const app = createApp(App);
let app;

const initializeApp = () => {
  app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.use(vuetify);
  app.use(ToastPlugin);
  app.use(VueMasonryPlugin);
  app.mount('#app');
};

// restoring user auth state
onAuthStateChanged(AUTH, () => {
  if (!app) {
    initializeApp();
  }
});
