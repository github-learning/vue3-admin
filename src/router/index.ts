import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
export const layoutsRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: '数据面板'
    },
    component: () => import('@/views/dashboard/index.vue')
  }
  // {
  //   path: '/system',
  //   name: 'System',
  //   meta: {
  //     title: '用户管理'
  //   },
  //   redirect: '/system/role',
  //   children: [
  //     {
  //       path: '/system/role',
  //       name: 'role',
  //       component: () => import('@/views/system/role/index.vue'),
  //       meta: {
  //         title: '角色管理'
  //       }
  //     },
  //     {
  //       path: '/system/user',
  //       name: 'user',
  //       component: () => import('@/views/system/user/index.vue'),
  //       meta: {
  //         title: '用户管理'
  //       }
  //     },
  //     {
  //       path: '/system/menu',
  //       name: 'menu',
  //       component: () => import('@/views/system/menu/index.vue'),
  //       meta: {
  //         title: '菜单管理'
  //       }
  //     }
  //   ]
  // }
]
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index.vue')
  },
  {
    path: '/',
    name: 'layouts',
    component: Layout,
    // redirect: '/dashboard',
    children: layoutsRoutes
  }
]

export const asyncRoutes: RouteRecordRaw[] = [
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'documentation',
  //       component: () => import('@/views/documentation/index.vue'),
  //       meta: {
  //         icon: 'ant-design:database-filled',
  //         title: 'documentation'
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'guide',
  //       component: () => import('@/views/guide/index.vue'),
  //       meta: {
  //         icon: 'ant-design:car-twotone',
  //         title: 'guide'
  //       }
  //     }
  //   ]
  // },
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
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          icon: 'ant-design:unlock-filled',
          title: 'menu'
        }
      },

      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          icon: 'ant-design:unlock-filled',
          title: 'role'
        }
      },
      {
        path: 'user',
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

export const router = createRouter({
  routes,
  history: createWebHashHistory('')
})
