<template>
  <el-form :model="formValue" @submit.prevent="onSubmit" inline>
    <template v-for="column in columns" :key="column.dataIndex">
      <el-form-item :label="column.label">
        <!-- <el-input v-model="column.dataIndex" placeholder="请输入"></el-input> -->
        {{ formValue }}
        <component
          :is="getComponentType(column.valueType)"
          v-model="formValue[column.dataIndex]"
          v-bind="getComponentProps(column)"
        >
          {{ column.dataIndex }}
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'

// 传入的表单列配置
const props = defineProps({
  columns: {
    type: Array,
    required: true
  }
})

console.log(
  '%c [  ]-30',
  'font-size:13px; background:pink; color:#bf2c9f;',
  props.columns
)
// 动态初始化表单数据
const formValue = reactive({})

const initializeFormValue = () => {
  props.columns.forEach((column) => {
    formValue[column.dataIndex] =
      column.defaultValue !== undefined ? column.defaultValue : null
  })
}

// 初始化 formValue
initializeFormValue()

// 监听 columns 的变化并重新初始化表单数据
watch(
  () => props.columns,
  () => {
    initializeFormValue()
  },
  { immediate: true, deep: true }
)

// 根据 valueType 返回对应的组件类型
const getComponentType = (valueType) => {
  switch (valueType) {
    case 'select':
      return 'el-select'
    case 'multiple':
      return 'el-select'
    case 'date':
      return 'el-date-picker'
    case 'range':
      return 'el-date-picker'
    default:
      return 'el-input'
  }
}

// 根据 column 配置生成对应组件的属性
const getComponentProps = (column) => {
  const { valueType, valueEnum, dateOptions, placeholder } = column

  const baseProps = { placeholder: placeholder || '请输入' }

  if (valueType === 'select' || valueType === 'multiple') {
    const options =
      typeof valueEnum === 'function'
        ? Object.entries(valueEnum()).map(([value, label]) => ({
            label,
            value
          }))
        : Object.entries(valueEnum || {}).map(([value, label]) => ({
            label,
            value
          }))

    return {
      ...baseProps,
      multiple: valueType === 'multiple',
      options
    }
  }

  if (valueType === 'date') {
    return {
      ...baseProps,
      type: 'date',
      ...dateOptions
    }
  }

  if (valueType === 'range') {
    return {
      ...baseProps,
      type: 'daterange',
      ...dateOptions
    }
  }

  return baseProps
}

// 提交表单
const onSubmit = () => {
  console.log('提交搜索表单: ', formValue)
}

// 重置表单
const onReset = () => {
  Object.keys(formValue).forEach((key) => {
    formValue[key] = undefined
  })
}
</script>
