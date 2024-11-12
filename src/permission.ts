import { router } from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils'
const whiteList = ['/login']
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
      path: '/login'
    }
  }
})
