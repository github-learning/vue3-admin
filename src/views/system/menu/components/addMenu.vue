<template>
  <div class="editor-container" p-20px>
    <el-form ref="editFormRef" :model="editData" label-width="80px">
      <el-form-item label="菜单标题">
        <el-input v-model="editData.title" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="editData.path" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="图标">
        <el-input v-model="editData.icon" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="路由name">
        <el-input v-model="editData.name" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitMenuForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance } from 'element-plus'

const emit = defineEmits(['submit'])

const editFormRef = ref<FormInstance | null>(null)
const editData = ref({
  title: '',
  path: '',
  icon: '',
  name: ''
})

// 提交编辑菜单
const submitMenuForm = () => {
  ;(editFormRef.value as FormInstance).validate((valid) => {
    if (valid) {
      emit('submit', editData.value)
      editData.value = {
        title: '',
        path: '',
        icon: '',
        name: ''
      }
    }
  })
}
</script>
