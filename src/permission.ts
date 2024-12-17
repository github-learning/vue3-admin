import { router } from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils'
import { useUserStore } from './stores'
import { usePermissionStore } from './stores/permission'
NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/register']

router.beforeEach(async (to) => {
  // 获取用户信息
  NProgress.start()
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
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
        // const roleIds = userStore.state.roleIds
        // console.log('roleIds', roleIds)
        // 用角色生成菜单树
        const routes = await permissionStore.generateRoutes()

        console.log(
          '%c [routes  ]-39',
          'font-size:13px; background:pink; color:#bf2c9f;',
          routes
        )

        routes.forEach(router.addRoute) // 内部添加到映射表中
        console.log('to.path', to.path)
        // 确保动态路由加载完成后跳转
        // 避免重复跳转检查
        if (to.matched.length === 0) {
          return {
            path: to.path, // 重定向到原目标路径
            replace: true // 避免重复历史记录
          }
        }
        NProgress.done()
        return true
        // return router.push(to.path)
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
