<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>此站点是《vue3 + vite5 实战后台开发》演示项目</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form
        ref="formRef"
        :rules="loginRules"
        :model="loginForm"
        class="w-[250px]"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#626aef"
            class="w-[250px]"
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
        <span class="text-slate-400 text-sm float-right m-2"
          >还没有账号？ 请
          <router-link to="register"> 点击这里注册 </router-link>
        </span>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { login } from '@/apis/user'
import { router } from '@/router'
import { setToken } from '@/utils'
import { useRouteQuery } from '@/hooks/useRouteQuery'
import { FormInstance } from 'element-plus'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
const { proxy } = getCurrentInstance()!
const { redirect, otherQuery } = useRouteQuery()
const loginState = reactive({
  loginForm: {
    username: 'test-1',
    password: '123456-1'
  },
  loginRules: {
    username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
  }
})
const { loginForm, loginRules } = loginState

const loginFormInstance = useTemplateRef<FormInstance>('formRef')

const passwordRef = useTemplateRef<HTMLInputElement>('password')
const usernameRef = useTemplateRef<HTMLInputElement>('username')
const loading = ref(false)
const onSubmit = () => {
  loginFormInstance.value?.validate(async (valid) => {
    if (valid) {
      loading.value = true
      await login(loginForm)
        .then((res) => {
          proxy?.$message.success('登录成功')
          setToken(res.data.token)
          router.push({
            path: redirect.value || '/',
            query: otherQuery.value
          })
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}

// 监听回车事件
function onKeyUp(e: KeyboardEvent) {
  if (e.key == 'Enter') onSubmit()
}

onMounted(() => {
  // 添加键盘监听
  document.addEventListener('keyup', onKeyUp)
  // 自动聚焦
  if (loginState.loginForm.username === '') {
    usernameRef.value?.focus()
  } else if (loginState.loginForm.password === '') {
    passwordRef.value?.focus()
  }
})
// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<style scoped></style>
