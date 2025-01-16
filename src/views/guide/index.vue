<template>
  <proTable :table-columns="tableColumns" :data="fetchData" stripe />
</template>

<script setup lang="jsx">
import proTable from '@/components/ProTable'

// 表格列配置

const tableColumns = ref([
  {
    label: '名称',
    prop: 'name',
    width: '150'
  },
  {
    label: '状态',
    prop: 'status',
    width: '150',
    render: (row) => {
      return (
        <span style={{ color: row.status == 'Active' ? 'red' : 'green' }}>
          {row.status}
        </span>
      )
    }
  },
  {
    label: '操作',
    prop: 'action',
    width: '180',
    render: (row) => {
      const handleAction = (row) => {
        console.log(row)
      }
      return <el-button onClick={() => handleAction(row)}>操作按钮</el-button>
    }
  }
])

const fetchData = ref([
  { name: 'Item 1', status: 'Active', action: '' },
  { name: 'Item 2', status: 'Inactive', action: '' }
])
</script>
