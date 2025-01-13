<template>
  <div>
    <ProTable
      :query-fields="queryFields"
      :table-columns="tableColumns"
      :data="fetchData"
    />
  </div>
</template>

<script setup>
// 查询条件配置
const queryFields = [
  {
    label: '名称',
    prop: 'name',
    component: 'el-input',
    props: {
      placeholder: '请输入名称'
    }
  },
  {
    label: '状态',
    prop: 'status',
    component: 'el-select',
    props: {
      placeholder: '请选择状态',
      options: [
        { value: 'active', label: '启用' },
        { value: 'inactive', label: '停用' }
      ]
    }
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    component: 'el-date-picker',
    props: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期'
    }
  }
]

// 表格列配置
const tableColumns = [
  {
    label: '名称',
    prop: 'name',
    width: '150'
  },
  {
    label: '状态',
    prop: 'status',
    render: 'StatusTag', // 自定义渲染组件
    width: '100'
  },
  {
    label: '操作',
    render: 'ActionButtons', // 自定义操作列
    width: '200'
  }
]

// 模拟请求数据的方法
const fetchData = ref([
  { name: '张三', status: 'active' },
  { name: '李四', status: 'inactive' },
  { name: '王五', status: 'active' }
])
</script>
