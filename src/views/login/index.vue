<!-- <template>
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
import router from '@/router'
import { setToken } from '@/utils'
import { useRouteQuery } from '@/hooks/useRouteQuery'
import { FormInstance } from 'element-plus'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
const { proxy } = getCurrentInstance()!
const { redirect, otherQuery } = useRouteQuery()
const loginState = reactive({
  loginForm: {
    username: 'test-12',
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
  loginFormInstance.value?.validate(async (valid: boolean) => {
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

<style scoped></style> -->

<template>
  <ProTable
    :queryFields="queryFields"
    :tableColumns="tableColumns"
    :fetchData="fetchData"
  >
    <template #status="{ scope }">
      <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
        {{ scope.row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>
    <template #action="{ scope }">
      <el-button type="text" size="small" @click="editRow(scope.row)"
        >编辑</el-button
      >
      <el-button type="text" size="small" @click="deleteRow(scope.row)"
        >删除</el-button
      >
    </template>
  </ProTable>
</template>

<script>
export default {
  setup() {
    const queryFields = [
      {
        label: '名称',
        prop: 'name',
        component: 'el-input',
        props: { placeholder: '请输入名称' }
      },
      {
        label: '状态',
        prop: 'status',
        component: 'el-select',
        props: {
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        }
      }
    ]

    const tableColumns = [
      { label: '编号', prop: 'id', width: '80' },
      { label: '名称', prop: 'name' },
      { label: '状态', prop: 'status', slot: 'status' },
      { label: '创建时间', prop: 'createdAt', sortable: true }
    ]
    // ...filters
    const fetchData = async ({ page, pageSize }) => {
      // 模拟 API 数据
      return new Promise((resolve) => {
        setTimeout(() => {
          const total = 50
          const data = Array.from({ length: pageSize }, (_, index) => ({
            id: (page - 1) * pageSize + index + 1,
            name: `示例${(page - 1) * pageSize + index + 1}`,
            status: Math.random() > 0.5 ? 1 : 0,
            createdAt: new Date().toLocaleDateString()
          }))
          resolve({ data, total })
        }, 1000)
      })
    }

    const editRow = (row) => {
      console.log('编辑行:', row)
    }

    const deleteRow = (row) => {
      console.log('删除行:', row)
    }

    return {
      queryFields,
      tableColumns,
      fetchData,
      editRow,
      deleteRow
    }
  }
}
</script>
