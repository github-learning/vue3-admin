<template>
  <el-dialog
    v-model="dialogVisible"
    :title="$t('common_verify_message')"
    width="500px"
    :align-center="true"
    destroy-on-close
    :close-on-click-modal="false"
    @close="dialogVisible = false"
  >
    <el-form ref="formRef" :model="formData" label-position="top">
      <el-form-item :label="$t('common_verify_password')" prop="account">
        <el-input
          v-model="formData.password"
          :placeholder="$t('common_enter')"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t('common_cancel')
        }}</el-button>
        <el-button type="primary" @click="handleSure()">
          {{ $t('common_confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import eventBus from '@/utils/event-bus-util'
import { ADMIN_VERIFY_PASSWORD } from '@/config/get-env'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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
    ElMessage.error(t('common_verify_password_failed'))
  }
}
</script>
