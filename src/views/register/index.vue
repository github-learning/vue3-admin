<template>
  <el-row class="register-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>此站点是《vue3 + vite5 实战后台开发》演示项目</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <p class="title">用户注册</p>
      <div>
        <span class="line"></span>
        <div>账号注册</div>
        <span class="line"></span>
      </div>
      <el-form
        ref="ruleFormRef"
        class="w-[250px]"
        :model="registerFormData"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="registerFormData.username"
            autocomplete="off"
            placeholder="请输入用户名"
          >
            <template #prefix>
              <el-icon><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerFormData.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="verPassword">
          <el-input
            type="password"
            v-model="registerFormData.verPassword"
            placeholder="请确认密码"
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
            type="primary"
            color="#626aef"
            :loading="loading"
            @click="submitForm(ruleFormRef)"
            class="w-[250px]"
          >
            注册
          </el-button>
        </el-form-item>
        <span class="text-slate-400 text-sm float-right m-2"
          >已有帐号？返回
          <router-link to="login"> 登陆 </router-link>
        </span>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { register } from '@/apis/user'

const ruleFormRef = ref<FormInstance>()
const loading = ref(false)

interface typeRegiser extends Record<string, string> {
  username: string
  password: string
  verPassword: string
}
const registerFormData: typeRegiser = reactive({
  username: '',
  password: '',
  verPassword: ''
})
const router = useRouter()

const validatePass = (
  _: unknown,
  value: string,
  callback: (error?: string | Error) => void
) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value.toString() !== registerFormData.password) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<typeof registerFormData>>({
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
  verPassword: [{ validator: validatePass, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      await register(registerFormData)
        .then(() => {
          router.push({
            path: '/login'
          })
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
</script>

<style lang="scss" scoped></style>
