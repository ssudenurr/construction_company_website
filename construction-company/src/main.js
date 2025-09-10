import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import tr from './locales/tr.json'
import deu from './locales/deu.json'


const i18n = createI18n({
  legacy: false, // for using the Composition API
  locale: 'en', // default language
  fallbackLocale: 'en',
  messages: {
    en,
    tr,
    deu
  },
})

const app = createApp(App)
app.use(i18n)
app.use(router)

app.mount('#app')
