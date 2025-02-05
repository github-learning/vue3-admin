/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
// 定义Eletron自定义方法
export interface IElectronAppAPI {
  sendMsg: (val: string) => Promise<void>
  receiveMessageFromMain: (callback: (val: string) => void) => Promise<void>
}

// 全局添加类型
declare global {
  declare const __APP_NAME__: string
  declare const __APP_PROJECT__: string
  declare const __APP_VERSION__: string
  declare const __APP_IS_DYNAMIC_BASE_URL__: string

  interface Window {
    appAPI: IElectronAppAPI
    eventBus: unknown // 声明window上自定义属性，如事件总线
    socket: unknown
  }

  interface ImportMeta {
    readonly env: object
  }
}
// 声明.vue文件
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
