<template>
  <el-dialog
    v-model="dialogVisible"
    title="危险操作！请输入二次校验密码"
    width="500px"
    :align-center="true"
    destroy-on-close
    :close-on-click-modal="false"
    @close="dialogVisible = false"
  >
    <el-form ref="formRef" :model="formData" label-position="top">
      <el-form-item label="检验密码" prop="account">
        <el-input v-model="formData.password" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="handleSure()"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import eventBus from '@/utils/event-bus-util'
import { ADMIN_VERIFY_PASSWORD } from '@/config/get-env'

const dialogVisible = ref(false)
const formData = reactive({
  password: ''
})

eventBus.on('openGolbalDialog', () => {
  dialogVisible.value = true
})

const handleSure = () => {
  if (formData.password === ADMIN_VERIFY_PASSWORD) {
    eventBus.emit('closeGolbalDialog', '')
    dialogVisible.value = false
    formData.password = ''
  } else {
    ElMessage.error('检验失败')
  }
}
</script>
