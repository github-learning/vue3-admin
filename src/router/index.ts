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
  },
  {
    path: '/system',
    name: 'System',
    meta: {
      title: '用户管理'
    },
    redirect: '/system/role',
    children: [
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理'
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

// 需要根据用户赋予的权限来动态添加异步路由
export const routes = [...constantRoutes]

export const router = createRouter({
  routes,
  history: createWebHashHistory('')
})
