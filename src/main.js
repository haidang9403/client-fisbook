import './assets/base.css'
import './assets/style.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../node_modules/flowbite-vue/dist/index.css';
import AsyncComputed from 'vue-async-computed';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'



import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(AsyncComputed)
app.use(router)

app.mount('#app')
