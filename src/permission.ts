import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils'
import { useUserStore } from './stores'
import { usePermissionStore } from './stores/permission'
NProgress.configure({ showSpinner: false })
// const whiteList = ['/login', '/register']

// router.beforeEach(async (to) => {
//   // 获取用户信息
//   NProgress.start()
//   const userStore = useUserStore()
//   const permissionStore = usePermissionStore()
//   const hasToken = getToken()
//   console.log('hasToken', hasToken)

//   if (hasToken) {
//     if (to.path === '/login') {
//       NProgress.done()
//       return {
//         path: '/',
//         replace: true
//       }
//     } else {
//       // 用token 换取用户信息
//       try {
//         const hasRoles = userStore.state.roles.length > 0
//         if (hasRoles) {
//           NProgress.done()
//           return true
//         }
//         await userStore.getUserInfo()
//         // const roleIds = userStore.state.roleIds
//         // console.log('roleIds', roleIds)
//         // 用角色生成菜单树
//         const routes = await permissionStore.generateRoutes()

//         console.log(
//           '%c [routes  ]-39',
//           'font-size:13px; background:pink; color:#bf2c9f;',
//           routes
//         )

//         routes.forEach(router.addRoute) // 内部添加到映射表中
//         console.log('to.path', to.path)
//         // 确保动态路由加载完成后跳转
//         // 避免重复跳转检查
//         // if (to.matched.length === 0) {
//         //   return {
//         //     path: to.path, // 重定向到原目标路径
//         //     replace: true // 避免重复历史记录
//         //   }
//         // }
//         // return router.push(to.path)
//         NProgress.done()
//         return true
//       } catch {
//         userStore.logout()
//         NProgress.done()
//         return `login?redirect=${to.path}`
//       }
//     }
//     NProgress.done()
//   } else {
//     if (whiteList.includes(to.path)) {
//       NProgress.done()
//       return true
//     }
//     return {
//       path: '/login',
//       // 给予跳转后重定向参数
//       query: {
//         redirect: to.path,
//         ...to.query
//       }
//     }
//   }
// })
// const whiteList = ['/login']
// 远程路由是否加载

const whiteList = ['/login']
router.beforeEach(async (to) => {
  NProgress.start()
  const hasToken = getToken()
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  if (hasToken) {
    //  用token换用户信息
    if (to.path === '/login') {
      NProgress.done()
      return {
        path: '/',
        replace: true
      }
    } else {
      // 用token 换取 用户信息， 也有可能token是伪造的
      try {
        const hasRoles = userStore.state.roles.length > 0
        if (hasRoles) {
          NProgress.done()
          return true
        }
        await userStore.getUserInfo()
        // const roles = userStore.state.roles // 稍后用角色来生成菜单树
        const routes = await permissionStore.generateRoutes()
        routes.forEach(router.addRoute) // 内部添加到映射表中
        // 如果目标路由未匹配，则重新导航

        console.log(
          '%c [  ]-111',
          'font-size:13px; background:pink; color:#bf2c9f;',
          to
        )
        if (to.matched.length === 0) {
          return { path: to.fullPath, replace: true }
        }
        // return router.push(txo.path)

        NProgress.done()
        return true
      } catch {
        userStore.logout()
        NProgress.done()
        return '/login?redirect=' + to.path
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      NProgress.done()
      return true
    }
    return {
      path: '/login',
      query: {
        redirect: to.path,
        ...to.query
      }
      // 给与跳转后的重定向参数，还有其他参数
    }
  }
})

// return router.push(to.path)
