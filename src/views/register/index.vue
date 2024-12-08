<template>
  <el-row class="register-container">
    <el-col :lg="8" :md="12" class="left">
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
            v-model.number="registerFormData.verPassword"
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
      </el-form>
    </el-col>
    <el-col :lg="16" :md="12" class="right">
      <div>
        <div>欢迎光临</div>
        <div>此站点是《vue3 + vite5 实战后台开发》演示项目</div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { register } from '@/apis/user'
import { sleep } from '@/utils/helpers'
const { proxy } = getCurrentInstance()!

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
        .then(async (res) => {
          proxy?.$message.success(res.message)
          await sleep()
          router.push({
            path: '/login'
          })
        })
        .catch(() => {
          for (const key in registerFormData) {
            if (Object.prototype.hasOwnProperty.call(registerFormData, key)) {
              registerFormData[key] = ''
            }
          }
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
</script>

<style lang="scss" scoped>
.register-container {
  @apply min-h-screen bg-indigo-500;
}
.register-container .left,
.register-container .right {
  @apply flex items-center justify-center;
}
.register-container .left {
  @apply bg-light-50 flex-col;
}
.right > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}
.right > div > div:last-child {
  @apply text-gray-200 text-sm;
}
.left .title {
  @apply font-bold text-3xl text-gray-800;
}
.left > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.left .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
