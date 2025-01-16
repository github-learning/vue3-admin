<template>
  <proTable :table-columns="tableColumns" :data="fetchData" stripe />
  <!-- <template #status="{ row }">
        <span :style="{ color: row.status == 'active' ? 'red' : 'green' }">{{
          row.status
        }}</span>
      </template>
      <template #action="{ row }">
        <button @click="handleAction(row)">操作按钮</button>
      </template> -->
</template>

<script setup lang="jsx">
import proTable from '@/components/ProTable/index.vue'
// lang="jsx"

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
    width: '150'
  },
  {
    label: '操作',
    prop: 'action',
    width: '180',
    render: (row) => (
      <button onClick={() => this.handleAction(row)}>操作按钮</button>
    )
  }
])

const fetchData = ref([
  { name: 'Item 1', status: 'Active', action: '' },
  { name: 'Item 2', status: 'Inactive', action: '' }
])

// const handleAction = (raw) => {
//   console.log(
//     '%c [  ]-85',
//     'font-size:13px; background:pink; color:#bf2c9f;',
//     raw
//   )
// }
</script>
