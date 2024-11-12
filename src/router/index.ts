import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const layoutsRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: '数据面板'
    },
    component: () => import('@/views/dashboard/index.vue')
  },
  {
    path: '/system',
    name: 'System',
    meta: {
      title: '用户管理'
    },
    component: () => import('@/views/system/index.vue'),
    children: [
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理'
        }
      }
    ]
  }
]
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },

  {
    path: '/',
    name: 'layouts',
    component: () => import('@/layout/index.vue'),
    // redirect: '/dashboard',
    children: layoutsRoutes
  }
]

// 需要根据用户赋予的权限来动态添加异步路由
export const routes = [...constantRoutes]

export const router = createRouter({
  routes,
  history: createWebHashHistory('')
})
