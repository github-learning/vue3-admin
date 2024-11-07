<template>
  <el-row class="h-100vh bg-indigo-500">
    <el-col :span="16">
      <div class="h-full flex-center flex-col">
        <div class="font-bold text-3xl text-white mb-4">欢迎光临</div>
        <div>此站点是《vue3+vite5 实战后台开发》演示地址</div>
      </div>
    </el-col>
    <el-col :span="8" class="bg-light-50 flex-center flex-col">
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div class="flex-center my-5 text-gray-300 space-x-2">
        <span class="h-[1px]w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px]w-16 bg-gray-200"></span>
      </div>
      <el-form
        class="login-form"
        ref="form"
        :rules="loginRules"
        :model="loginForm"
      >
        <div class="admin-logo">
          <img class="logo" src="../../assets/vue.svg" alt="logo" size-80px />
          <h1 class="name">Vue3 Admin</h1>
        </div>
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="loginForm.username">
            <template #prepend>
              <span class="svg-container">
                <svg-icon icon-name="ant-design:user-outlined"></svg-icon>
              </span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            placeholder="请输入密码"
            autocomplete="on"
            show-password
            v-model="loginForm.password"
            prop="password"
          >
            <template #prepend>
              <span class="svg-container">
                <svg-icon icon-name="ant-design:lock-outlined"></svg-icon>
              </span>
            </template>
          </el-input>
        </el-form-item>

        <el-button type="primary" @click="handleLogin" w-full mb-30px
          >登录</el-button
        >
      </el-form>
    </el-col>
  </el-row>

  <!-- <div class="login-container">
    <el-form
      class="login-form"
      ref="form"
      :rules="loginRules"
      :model="loginForm"
    >
      <div class="admin-logo">
        <img class="logo" src="../../assets/vue.svg" alt="logo" size-80px />
        <h1 class="name">Vue3 Admin</h1>
      </div>
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="loginForm.username">
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-name="ant-design:user-outlined"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="请输入密码"
          autocomplete="on"
          show-password
          v-model="loginForm.password"
          prop="password"
        >
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-name="ant-design:lock-outlined"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>

      <el-button type="primary" @click="handleLogin" w-full mb-30px
        >登录</el-button
      >
    </el-form>
  </div> -->
</template>

<script lang="ts" setup>
// import {useCounterStore}
// import { useUserStore } from '@/stores/user'
import { useCounterStore } from '@/stores'
const counter = useCounterStore()
console.log('counter', counter)
import { FormInstance } from 'element-plus'
// import { useRouteQuery } from '@/hooks/useRouteQuery'
// const { login } = useUserStore()
// const router = useRouter()
// const { redirect, otherQuery } = useRouteQuery()
const loginState = reactive({
  loginForm: {
    username: '',
    password: ''
  },
  loginRules: {
    username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
  }
})
const loginFormInstance = useTemplateRef<FormInstance>('form')
const { loginForm, loginRules } = loginState

const handleLogin = () => {
  loginFormInstance.value?.validate(async (valid) => {
    if (valid) {
      // await login(loginForm)
      // 解析出一个重定向的路径  + 其他的查询参数
      // router.push({ path: redirect.value || '/', query: otherQuery.value })
    }
  })
}
</script>

<style scoped lang="scss">
.login-container {
  @apply min-h-screen w-full;

  .login-form {
    @apply w-500px mx-auto py50px;
  }

  .admin-logo {
    @apply flex items-center justify-center my-20px;
  }
}
</style>
