import { router } from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils'
NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/register']
router.beforeEach(async (to) => {
  // 获取用户信息
  NProgress.start()
  const hasToken = getToken()
  console.log('hasToken', hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      NProgress.done()
      return {
        path: '/',
        replace: true
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
