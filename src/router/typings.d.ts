import 'vue-router'

// 给模块添加额外类型 ， ts中的接口合并
declare module 'vue-router' {
  interface RouteMeta {
    icon?: string
    title?: string
    hidden?: boolean
    alwaysShow?: boolean
    breadcrumb?: boolean
    affix?: boolean
    noCache?: boolean
  }
}
