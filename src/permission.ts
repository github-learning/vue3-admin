import { router } from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils'
import { useUserStore } from './stores'
// import { usePermissionStore } from './stores/permission'
NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/register']

router.beforeEach(async (to) => {
  // 获取用户信息
  NProgress.start()
  const userStore = useUserStore()
  // const permissionStore = usePermissionStore()
  const hasToken = getToken()
  console.log('hasToken', hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      NProgress.done()
      return {
        path: '/',
        replace: true
      }
    } else {
      // 用token 换取用户信息
      try {
        const hasRoles = userStore.state.roles.length > 0
        if (hasRoles) {
          NProgress.done()
          return true
        }
        await userStore.getUserInfo()
        const roleIds = userStore.state.roleIds
        console.log('roleIds', roleIds)
        // const routes = await permissionStore.generateRoutes()
        // routes.forEach(router.addRoute) // 内部添加到映射表中
        // return router.push(to.path)

        // 用角色生成菜单树
      } catch {
        userStore.logout()
        NProgress.done()
        return `login?redirect=${to.path}`
      }
    }
    NProgress.done()
  } else {
    if (whiteList.includes(to.path)) {
      NProgress.done()
      return true
    }
    return {
      path: '/login',
      // 给予跳转后重定向参数
      query: {
        redirect: to.path,
        ...to.query
      }
    }
  }
})
