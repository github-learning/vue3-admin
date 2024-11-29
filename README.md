### 项目描述

# vue-admin

#### 开发者工具

代码编辑器：VSCode

编辑器插件： 见 .vscode/extensions.json

#### 技术栈

- 框架：[TypeScript 4.x](https://www.typescriptlang.org/zh/) + [Vue 3.x](https://v3.cn.vuejs.org/)
- 工程化：[vite 5](https://vitejs.cn/vite5-cn/)
- 包管理器：[pnpm](https://www.pnpm.cn/)
- 代码规范：[Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) + [lsLint](https://ls-lint.org/)
- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- 提交规范：[Commitlint](https://commitlint.js.org/#/)

#### 版本库依赖

- 组件库：[element-plus@2.5.1](https://element-plus.org/zh-CN/)
- 路由：[vue-router@4.2.5](https://router.vuejs.org/zh/guide/)
- 本地持久化库：[pinia@2.1.7](https://pinia.web3doc.top/)

#### 插件工具

- 原子化 Css：[unocss](https://unocss.dev/integrations/vite)
- 生成 svg 雪碧图: [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons)

#### 项目命名规范

- 项目名：小写方式，多个单词以短横线分隔，例如：`vue-admin`

#### 文件和目录命名规范

- 类型声明：大驼峰方式，例如：`LoadMore`
- 目录名：小写方式，多个单词以短横线分隔，例如：`array-union`
- 图像文件：小写方式，多个单词以下划线分隔，例如：`banner_sina.jpg`
- HTML 文件：小写方式，多个单词以下划线分隔，例如：`error_report.html`
- CSS 文件：小写方式，多个单词以短横线分隔，例如：`date-picker.scss`
- JavaScript/TypeScript 文件：小写方式，多个单词以短横线分隔，例如：`date-util.js`
- Vue 组件：小写方式，多个单词以短横线分隔，例如：`base-svg-icon.vue`
- 调用 Vue 组件：小写方式，多个单词以短横线分隔，例如：`<base-svg-icon></base-svg-icon>`

#### 命名规范

- 声明 prop：小驼峰方式，例如：`userName`
- Vue Router Path：小驼峰方式，例如：`/userName`
- 变量：小驼峰方式，例如：`const mySchool = "我的学校"`
- 常量：大写方式，多个单词以下划线分隔，例如：`const MAX_COUNT = 10`
- 方法：小驼峰方式，使用动词、动词+名词形式，例如：`init()`、`jumpPage()`
- 请求数据的方法：使用动词+名词形式，以 `data` 结尾，例如：`getListData()`
- 自定义事件：小写方式，多个单词以短横线分隔，例如：`emit('my-event')`

请按照上述规范进行项目命名和代码编写，以保持一致的代码风格和易读性。

### 开始开发

#### 安装依赖

```shell
pnpm install
```

#### 启动项目

```bash
pnpm dev
```

#### 构建项目

```bash
pnpm run build
```

#### 代码检测

```bash
pnpm run lint
```

#### axios

> <---- 具体查看请求封装API

- | **类型** | **描述**                                               |
  | -------- | ------------------------------------------------------ |
  | build    | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
  | chore    | 其他修改, 比如改变构建流程、或者增加依赖库、工具等     |
  | ci       | 持续集成修改                                           |
  | docs     | 文档修改                                               |
  | feat     | 新特性、新功能                                         |
  | fix      | 修改bug                                                |
  | perf     | 优化相关，比如提升性能、体验                           |
  | refactor | 代码重构                                               |
  | revert   | 回滚到上一个版本                                       |
  | style    | 代码格式修改, 注意不是 css 修改                        |
  | test     | 测试用例修改                                           |
