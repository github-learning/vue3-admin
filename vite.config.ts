import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import externalGlobals from 'rollup-plugin-external-globals'
// import { sentryVitePlugin } from '@sentry/vite-plugin'
// 1自动导入 ElementPlus 所需样式
import ElementPlus from 'unplugin-element-plus/vite'
// UnoCSS 原子化css
import UnoCSS from 'unocss/vite'
import { fileURLToPath } from 'url'

import { visualizer } from 'rollup-plugin-visualizer'
import vueJsx from '@vitejs/plugin-vue-jsx'

//gizp 压缩
// import ViteCompression from 'vite-plugin-compression'
// br 压缩
// import brotli from 'rollup-plugin-brotli'

const pathSrc = path.resolve(__dirname, 'src')
// 不进行打包
// const globals = externalGlobals({
//   moment: 'moment',
//   xlsx: 'XLSX',
//   echarts: 'echarts'
// })

// 在此处使用读取package.json，是由于运行时的版本号可能通过bump修改，导致存在老版本
const packageJsonPath = path.resolve(__dirname, 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
const version = packageJson.version
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
        chunkFileNames: 'static/js/[name]-[hash].js', // 代码分割完的文件名
        entryFileNames: 'static/js/[name]-[hash].js', // 入口文件
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
  // 全局环境变量
  define: {
    __APP_VERSION__: JSON.stringify(version)
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
    // brotli(),
    // 其他插件...
    visualizer({
      filename: './dist/stats.html', // Path to output file
      // open: true, // Open the report automatically after build
      gzipSize: true, // Show gzip compressed size
      brotliSize: true // Show brotli compressed size
    }),

    vue(),
    vueJsx(),
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
      ],
      include: [/\.vue$/, /\.jsx$/]
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

// 每个文件都会被构建，chunk 数量多，同域名对资源加载数量有限制，chunk 数量多，导致同域名加载时间更长，每个限制一般是6个，后面的
// css 拆的细，会阻塞dom的渲染，会放在header 同步下载
// 白屏时间，hash 缓存，不能最大限度的缓存，都要加载全部
// 如果小于chunk / 合并
// 缓存（单个链接）和 按需加载，
// 每个页面只需要 加载自己需要的：而不是 all in one
// 业务代码最大程度的按需加载 /
// html2canvas , 只有极少数的页面使用了，所以我们要单独处理
// 外链的处理  /
// 不到1kb 的也要分成一个chunk ， 不合适，所以要进行合并，用的很少，提出来
// 用的三方库特别多，用外链的形式，这样就不用打包了，
// 看依赖的频率，外链，extrenal
