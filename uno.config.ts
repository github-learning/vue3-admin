import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives()],
  // 自定义规则
  shortcuts: {
    'flex-center': ['flex', 'justify-center', 'items-center']
  }
})
