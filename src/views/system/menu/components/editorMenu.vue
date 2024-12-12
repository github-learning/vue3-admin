<template>
  <div class="editor-container">
    <el-form
      ref="editFormRef"
      :model="editData"
      :rules="menuFormRules"
      label-width="100px"
    >
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="editData.title" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="editData.path" placeholder="请输入路由路径" />
      </el-form-item>
      <el-form-item label="路由Name" prop="name">
        <el-input v-model="editData.name" placeholder="请输入路由名称" />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="editData.icon" placeholder="请输入icon名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitMenuForm">编辑菜单</el-button>
        <el-button @click="submitReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { MenuData } from '@/apis/menu'
import { FormInstance } from 'element-plus'
const emit = defineEmits(['updateEdit'])
// 编辑的数据
const editData = ref({
  id: -1,
  title: '',
  name: '',
  path: '',
  icon: ''
})
// 验证规则
const menuFormRules = {
  title: {
    required: true,
    message: '请输入菜单名称',
    trigger: 'blur'
  },
  path: {
    required: true,
    message: '请输入路由路径',
    trigger: 'blur'
  },
  name: {
    required: true,
    message: '请输入路由名称',
    trigger: 'blur'
  }
}
const editFormRef = ref<FormInstance | null>(null)
const loading = ref(false)

const resetFormData = (data: MenuData) => {
  editData.value = { ...editData.value, ...data }
}
const props = defineProps({
  data: {
    type: Object as PropType<MenuData>,
    required: true
  }
})
watch(
  () => props.data,
  (value) => {
    if (value) {
      resetFormData(value)
    }
  }
)
const submitReset = () => resetFormData(props.data)

const submitMenuForm = () => {
  ;(editFormRef.value as FormInstance).validate((valid) => {
    if (valid) {
      loading.value = true
      emit('updateEdit', { ...editData.value })
    }
  })
}
</script>
