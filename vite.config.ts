import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import externalGlobals from 'rollup-plugin-external-globals'
// import { sentryVitePlugin } from '@sentry/vite-plugin'
// 1自动导入 ElementPlus 所需样式
import ElementPlus from 'unplugin-element-plus/vite'
// 1.UnoCSS 原子化css
import UnoCSS from 'unocss/vite'
import { fileURLToPath } from 'url'

import { visualizer } from 'rollup-plugin-visualizer'
//gizp 压缩
import ViteCompression from 'vite-plugin-compression'
// br 压缩
// import brotli from 'rollup-plugin-brotli'

const pathSrc = path.resolve(__dirname, 'src')
// 不进行打包
// const globals = externalGlobals({
//   moment: 'moment',
//   xlsx: 'XLSX',
//   echarts: 'echarts'
// })
export default defineConfig({
  build: {
    sourcemap: false,

    rollupOptions: {
      // experimentalLogSideEffects: true,
      treeshake: {
        preset: 'recommended'
      },
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url))
      },
      output: {
        experimentalMinChunkSize: 20 * 1024, // experimentalLogSideEffects | 有一些存在函数副作用，所以虽然配置了最小chunk, 但是会影响tree-shaking, 不会和并
        // 第三方库，
        format: 'esm',
        chunkFileNames: 'static/js/[chunk]-[hash].js', // 代码分割完的文件名
        entryFileNames: 'static/js/[entry]-[hash].js', // 入口文件
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]' // 静态资源

        //chunk 多了会怎么样 ？

        // manualChunks: (id: string) => {
        //   if (id.includes('node_modules')) {
        //     return 'vendor'
        //   }
        //   return 'index'
        // }
        // manualChunks: {
        //   vue: [
        //     'vue',
        //     'pinia',
        //     'vue-router',
        //     'vue-i18n',
        //     'virtual:svg-icons-register'
        //   ],
        //   proto: ['src/generated/proto/index.js']
        // },
        // chunkFileNames: 'static/js/[name]-[hash].js',
        // entryFileNames: 'static/js/[name]-[hash].js',
        // assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': pathSrc
    }
  },

  plugins: [
    // ViteCompression({
    //   threshold: 20 * 1024, // 超过多少进行压缩
    //   ext: '.gz',
    //   algorithm: 'gzip'
    // }),
    brotli(),
    // 其他插件...
    visualizer({
      filename: './dist/stats.html', // Path to output file
      // open: true, // Open the report automatically after build
      gzipSize: true, // Show gzip compressed size
      brotliSize: true // Show brotli compressed size
    }),

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
    // sentryVitePlugin({
    //   org: 'birds', // 替换为你的 Sentry 组织名
    //   project: 'vue3-app', // 替换为你的 Sentry 项目名
    //   authToken:
    //     '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', // 替换为你的 Sentry Auth Token
    //   sourcemaps: {
    //     assets: './dist/**' // 指定 Source Map 文件路径
    //   },
    //   release: {
    //     name: process.env.npm_package_version || 'development', // 使用项目版本作为 release 名称
    //     create: true // 自动创建 release
    //   }
    // }),
    // sentryVitePlugin({
    //   org: 'birds-gl',
    //   project: 'vue3-app'
    // })
  ],

  base: './',

  server: {
    // port: 3000,
    proxy: {
      '/dev-api': {
        target: 'http://localhost:3000', // 代理到 NestJS 服务器
        changeOrigin: true, // 是否修改请求的源头
        rewrite: (path) => path.replace(/^\/dev-api/, '') // 可选：如果需要删除前缀
        // rewrite: (path) => path.replace(/^\/dev-api/, '/api') // 可选：如果需要删除前缀
      }
    }
  }

  // build: {
  //   sourcemap: true
  // }
})
