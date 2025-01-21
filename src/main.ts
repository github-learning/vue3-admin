// import './style.css'
import 'normalize.css/normalize.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import element from './plugins/element'
import directives from './directives/index'

import Particles from 'particles.vue3' // 引入
// import * as Sentry from '@sentry/vue'
// 注册持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import './style.sass'
import './permission'
import './style/index.css'
const pinia = createPinia()
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
const app = createApp(App)
// Sentry.init({
//   app,
//   dsn: 'https://a4bb4f1ddc59bfba107c606a69e02111@o4508597166211072.ingest.us.sentry.io/4508597325594624',
//   integrations: [
//     Sentry.browserTracingIntegration({ router }),
//     Sentry.replayIntegration()
//   ],
//   // Tracing
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// })

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import 'virtual:uno.css'

pinia.use(piniaPluginPersistedstate)
window.document.documentElement.setAttribute('data-theme', 'light')
app.use(router)
app.use(pinia)
app.use(Particles)
app.use(directives)
app.use(element)
app.mount('#app')
