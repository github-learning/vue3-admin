import { RouteRecordRaw } from 'vue-router'
import { useUserStore } from './user'
import { asyncRoutes } from '@/router'
import { useMenuStore } from './menu'
import { MenuData } from '@/apis/menu'

function generateRoutes(
  routes: RouteRecordRaw[], // 本地
  routesPath: string[] // 接口
) {
  const routerData: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const routePath = route.path
    if (route.children) {
      route.children = generateRoutes(route.children, routesPath)
    }

    if (
      routesPath.includes(routePath) ||
      (route.children && route.children.length >= 1)
    ) {
      routerData.push(route)
    }
  })

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
    const roleIds = computed(() => userStore.state.roleIds.map(Number))

    if (roleIds.value.includes(1)) {
      accessMenuRoutes = asyncRoutes // 添加了动态的组件

      // 去生成一个菜单， 根据角色来生成
      await menuStore.getAllMenuListByAdmin()
      return accessMenuRoutes
    } else {
      await menuStore.getMenuListByRoles(roleIds.value)
      // 筛选所需要加载的路由
      const menus = menuStore.state.authMenuList

      accessMenuRoutes = filterAsyncRoutes(menus, asyncRoutes)

      return accessMenuRoutes
    }
  }
  return {
    generateRoutes
  }
})
