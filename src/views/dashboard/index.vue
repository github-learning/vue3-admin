<template>
  <div>
    <el-button>hello</el-button>

    <!-- <div i-ant-design:apple-filled icon></div> -->

    <svg-icon
      icon-name="ant-design:apple-filled"
      custom-class="text-blue-100"
      @click="handle"
    ></svg-icon>

    <svg-icon
      icon-name="token-branded:1art"
      custom-class="text-red w-2em h-2em"
      @click="handle"
    ></svg-icon>

    <svg-icon
      icon-name="material-symbols-light:18-up-rating-outline-rounded"
    ></svg-icon>
    <svg-icon
      icon-name="https://zishui.oss-cn-beijing.aliyuncs.com/BugFilled.svg"
      :custom-class="val"
      @click="handle"
    ></svg-icon>

    <input type="text" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'dashboard'
})
// 将这些服务型的组件 放到 实例上来 调用
const { proxy } = getCurrentInstance()!

const handle = () => {
  proxy?.$message('This is a message.')
}

const val = ref('text-blue')

setTimeout(() => {
  val.value = 'text-red'
}, 1000)

// role ->  user
// role -> 菜单权限

// 后台管理系统  登录权限，接口权限，页面权限，菜单权限 ，按钮权限
</script>
