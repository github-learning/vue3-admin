<template>
  <el-form :model="_searchParam" inline>
    <template v-for="column in columns" :key="column.dataIndex">
      <el-form-item :label="column.label">
        <template v-if="column.valueType === 'select'">
          <el-select
            v-model="_searchParam[column.dataIndex]"
            :placeholder="column.placeholder || '请选择'"
          >
            <el-option
              v-for="(label, value) in getValueEnum(column)"
              :key="value"
              :label="label"
              :value="value"
            />
          </el-select>
        </template>
        <template v-else-if="column.valueType === 'multiple'">
          <el-select
            v-model="_searchParam[column.dataIndex]"
            :placeholder="column.placeholder || '请选择'"
            multiple
          >
            <el-option
              v-for="(label, value) in getValueEnum(column)"
              :key="value"
              :label="label"
              :value="value"
            />
          </el-select>
        </template>
        <template v-else-if="column.valueType === 'date'">
          <el-date-picker
            v-model="_searchParam[column.dataIndex]"
            type="date"
            :placeholder="column.placeholder || '请选择日期'"
            v-bind="column.dateOptions || {}"
          />
        </template>
        <template v-else-if="column.valueType === 'range'">
          <el-date-picker
            v-model="_searchParam[column.dataIndex]"
            type="daterange"
            :placeholder="column.placeholder || '请选择日期范围'"
            v-bind="column.dateOptions || {}"
          />
        </template>
        <template v-else>
          <el-input
            v-model="_searchParam[column.dataIndex]"
            :placeholder="column.placeholder || '请输入'"
          />
        </template>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ColumnProps } from '../model'
interface SearchFormItem {
  columns: ColumnProps[]
  searchParam: { [key: string]: any }
}
const props = defineProps<SearchFormItem>()

const _searchParam = computed(() => props.searchParam)

const emit = defineEmits(['search', 'reset'])

// 获取下拉选项
const getValueEnum = (column: ColumnProps) => {
  const { valueEnum } = column
  if (typeof valueEnum === 'function') {
    return valueEnum()
  }
  return valueEnum || {}
}

// 提交表单
const onSubmit = () => {
  console.log('搜索表单提交: ', _searchParam.value)

  emit('search')
}

// 重置表单
const onReset = () => {
  props.columns.forEach((column) => {
    _searchParam.value[column.dataIndex] =
      column.defaultValue !== undefined ? column.defaultValue : null
  })
  emit('reset', { ..._searchParam })
}
</script>
