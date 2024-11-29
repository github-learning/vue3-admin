import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 自动导入 ElementPlus 所需样式
import ElementPlus from 'unplugin-element-plus/vite'
// UnoCSS 原子化css
import UnoCSS from 'unocss/vite'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc
    }
  },
  build: {
    assetsDir: 'static' // 所有资源放在 /static 文件夹下
  },
  plugins: [
    vue(),
    UnoCSS(),

    AutoImport({
      // api
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: true } // 给eslint生产的配置 只需要一次,
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      // 所有的组件可以自动加载
      dirs: [
        'src/components',
        'src/layout/components',
        'src/views/**/components'
      ]
    }),

    ElementPlus({})
  ],
  // base: env.VITE_BASE || '/'

  base: './' // 这里需要设置为你的仓库名称
  // base: './', // 替换为你的仓库名
  // server: {
  //   // port: 3000,
  //   proxy: {
  //     '/dev-api': {
  //       target: 'http://localhost:3000', // 代理到 NestJS 服务器
  //       changeOrigin: true, // 是否修改请求的源头
  //       rewrite: (path) => path.replace(/^\/dev-api/, '') // 可选：如果需要删除前缀
  //       // rewrite: (path) => path.replace(/^\/dev-api/, '/api') // 可选：如果需要删除前缀
  //     }
  //   }
  // }
})
