<template>
  <el-form :model="editData" label-width="auto" style="max-width: 600px">
    <el-form-item label="角色名称">
      <el-input v-model="editData.name" />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="editData.description" />
    </el-form-item>
    <el-form-item label="是否是默认角色 ">
      <el-switch
        v-model="editData.is_default"
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { IRole } from '@/api/role'
import { PropType } from 'vue'

const editData = ref({
  name: '',
  description: '',
  is_default: 0
})

const { data } = defineProps({
  data: {
    type: Object as PropType<IRole>,
    default: () => ({})
  },
  type: {
    type: Number,
    required: true
  }
})
// 用于做默认值
const defaultProps = {
  name: '',
  description: '',
  is_default: 0
}
const resetForm = () => {
  editData.value = { ...defaultProps, ...data }
}
watchEffect(() => {
  if (data) {
    resetForm()
  }
})
const emit = defineEmits(['submit'])
const submitForm = () => {
  emit('submit', editData.value)
}
const handleReset = () => {
  resetForm()
}
</script>
