<template>
  <div class="editor-container" p-20px>
    <el-form
      ref="editFormRef"
      :model="editData"
      :rules="menuFormRules"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="editData.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="editData.mobile"
          placeholder="请输入手机"
          maxlength="11"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editData.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="editData.status" />
      </el-form-item>
      <el-form-item label="角色分配" prop="roleIds">
        {{ editData.roleIds }}
        <el-select multiple v-model="editData.roleIds" placeholder="请选择角色">
          <el-option
            v-for="item in editData.roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="description">
        <el-input
          type="textarea"
          :rows="3"
          v-model="editData.description"
          placeholder="请输入说明"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitMenuForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { Profile } from '@/apis/user'
import type { FormInstance, FormItemRule } from 'element-plus'
import type { PropType } from 'vue'

const props = defineProps({
  type: {
    // 操作类型 0编辑 1新增
    type: Number,
    required: true
  },
  data: {
    type: Object as PropType<Profile>
  }
})
const emit = defineEmits(['submit'])

const editFormRef = ref<FormInstance | null>(null)
const editData = ref<Partial<Profile>>({
  username: '',
  mobile: '',
  email: '',
  description: '',
  status: true
})

// 验证规则
const validateMobile = (
  _rule: unknown,
  value: string,
  callback: (arg?: Error) => void
) => {
  if (!isNaN(Number(value)) && value.length === 11) {
    callback()
  }
  callback(new Error('请输入正确格式手机号!'))
}

const menuFormRules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ] as FormItemRule[],
  mobile: [
    {
      required: true,
      message: '请输入手机',
      trigger: 'blur'
    },
    {
      message: '请输入正确11位手机号',
      trigger: 'blur',
      validator: validateMobile
    }
  ],
  roleIds: {
    required: true,
    message: '请至少选择一个角色！',
    trigger: 'blur'
  }
}

const defaultProps = {
  username: '',
  email: '',
  mobile: '',
  description: '',
  status: true
}

watchEffect(() => {
  if (props.data) {
    // 移除之前表单效验结果
    editFormRef.value?.clearValidate()
    editData.value = { ...defaultProps, ...props.data }
  }
})

// 提交编辑菜单
const submitMenuForm = () => {
  ;(editFormRef.value as FormInstance).validate((valid) => {
    if (valid) {
      emit('submit', editData.value)
    }
  })
}
</script>
