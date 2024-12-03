// import './style.css'
import 'normalize.css/normalize.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import element from './plugins/element'
import directives from './directives/index'
// 注册持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './permission'
const pinia = createPinia()
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
const app = createApp(App)
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import 'virtual:uno.css'
import { router } from './router'
pinia.use(piniaPluginPersistedstate)
xxx.xxx.ccc
app.use(router)
app.use(pinia)
app.use(directives)
app.use(element)
app.mount('#app')
