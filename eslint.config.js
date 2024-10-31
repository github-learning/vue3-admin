import globals from "globals";
import pluginJs from "@eslint/js"; // 检验js规范的 (推荐)
import tseslint from "typescript-eslint"; // 推荐的ts规范
import pluginVue from "eslint-plugin-vue"; //推荐的vue的规范
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // 1. 检测文件的格式
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  // 2. 定义不同环境的全局变量
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  // 3. js 推荐 规则
  pluginJs.configs.recommended,
  // 4. ts 推荐 规则
  ...tseslint.configs.recommended,
  // 5. vue 推荐 规则
  ...pluginVue.configs["flat/essential"],
  // 6. 检测 vue 中的 ts 代码采用 tsparser
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  // 7. ignores 配置
  {
    ignores: [
      "node_modules/*",
      "dist/*",
      "*.css",
      "*.jpg",
      "*.jpeg",
      "*.png",
      "*.gif",
      "*.d.ts",
    ],
  },
  // 8. 自定义规则,根据需要增加  eslint 主要是校验代码规范  prettier  格式化代码的
  {
    rules: {
      "no-console": "error", // 参照下方实例图
      "vue/multi-word-component-names": "off",
      // semi: 1
    },
  },
  prettierRecommended // 覆盖掉eslint的规范
];
