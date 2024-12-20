import { RouteRecordRaw } from 'vue-router'
import { useUserStore } from './user'
import { asyncRoutes } from '@/router'
import { useMenuStore } from './menu'
import { MenuData } from '@/api/menu'

function generateRoutes(
  routes: RouteRecordRaw[], // 本地
  routesPath: string[] // 接口
) {
  const routerData: RouteRecordRaw[] = []
  routes.forEach((route) => {
    // path:'/dashboard'   path:index
    // const routePath = path.resolve(basePath, route.path)
    const routePath = route.path
    if (route.children) {
      route.children = generateRoutes(route.children, routesPath)
    }
    // 自己匹配我需要将自己放进去，如果儿子匹配成功父亲也要放入
    if (
      routesPath.includes(routePath) ||
      (route.children && route.children.length >= 1)
    ) {
      routerData.push(route)
    }
  })

  console.log(
    '%c [ routerData ]-28',
    'font-size:13px; background:pink; color:#bf2c9f;',
    routerData
  )
  return routerData
}

function filterAsyncRoutes(menus: MenuData[], routes: RouteRecordRaw[]) {
  const routesPath = menus.map((item) => item.path)

  return generateRoutes(routes, routesPath)
}

export const usePermissionStore = defineStore('permission', () => {
  const userStore = useUserStore()

  const menuStore = useMenuStore()
  let accessMenuRoutes: RouteRecordRaw[] = []
  const generateRoutes = async () => {
    // const rolesNames = computed(() =>
    //   userStore.state.roles.map((item) => item.name)
    // )
    const roleIds = computed(() => userStore.state.roleIds.map(Number))
    if (roleIds.value.includes(1)) {
      accessMenuRoutes = asyncRoutes // 添加了动态的组件

      // 去生成一个菜单， 根据角色来生成
      await menuStore.getAllMenuListByAdmin()
      return accessMenuRoutes
    } else {
      // return ''
      await menuStore.getMenuListByRoles(roleIds.value)
      // // 筛选所需要加载的路由
      const menus = menuStore.state.authMenuList

      console.log(
        '%c [ menus ]-58',
        'font-size:13px; background:pink; color:#bf2c9f;',
        menus
      )

      console.log(
        '%c [ asyncRoutes ]-64',
        'font-size:13px; background:pink; color:#bf2c9f;',
        asyncRoutes
      )

      accessMenuRoutes = filterAsyncRoutes(menus, asyncRoutes)

      console.log(
        '%c [  ]-67',
        'font-size:13px; background:pink; color:#bf2c9f;',
        accessMenuRoutes
      )
      return accessMenuRoutes
    }
  }
  return {
    generateRoutes
  }
})
