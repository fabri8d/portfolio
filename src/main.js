import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router/index.js'
import vuetify from './plugins/vuetify.js'
import './assets/main.css'

createApp(App)
  .use(router)
  .use(vuetify)
  .use(MotionPlugin)
  .mount('#app')
