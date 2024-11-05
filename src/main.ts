import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import element from './plugins/element'
// 注册持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(element)
app.mount('#app')
