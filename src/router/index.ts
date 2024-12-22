import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          icon: 'ant-design:bank-outlined',
          title: 'dashboard',
          affix: true, // 固定在tagsViews中
          noCache: true //   不需要缓存
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    // 当跳转到  /redirect/a/b/c/d?query=1
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hidden: true
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      hidden: true
    },
    component: () => import('@/views/register/index.vue')
  },
  {
    path: '/profile',
    component: Layout,
    name: 'profile',
    redirect: '/profile/index',

    meta: {
      hidden: true
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index.vue')
      }
    ]
  }
]
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: '/documentation/index',
        name: 'documentation',
        component: () => import('@/views/documentation/index.vue'),
        meta: {
          icon: 'ant-design:database-filled',
          title: 'documentation'
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: '/guide/index',
        name: 'guide',
        component: () => import('@/views/guide/index.vue'),
        meta: {
          icon: 'ant-design:car-twotone',
          title: 'guide'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    meta: {
      icon: 'ant-design:unlock-filled',
      title: 'system',
      alwaysShow: true
      // breadcrumb: false
      // 作为父文件夹一直显示
    },
    children: [
      {
        path: '/system/menu',
        name: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          icon: 'ant-design:unlock-filled',
          title: 'menu'
        }
      },

      {
        path: '/system/role',
        name: 'role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          icon: 'ant-design:unlock-filled',
          title: 'role'
        }
      },
      {
        path: '/system/user',
        name: 'user',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          icon: 'ant-design:unlock-filled',
          title: 'user'
        }
      }
    ]
  },

  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'http://www.baidu.com',
        redirect: '/',
        meta: {
          icon: 'ant-design:link-outlined',
          title: 'link Baidu'
        }
      }
    ]
  }
]
// 需要根据用户赋予的权限来动态添加异步路由
export const routes = [...constantRoutes]
export default createRouter({
  routes, // 路由表
  history: createWebHashHistory() //  路由模式
})
