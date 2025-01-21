<template>
  <!-- <proTable :table-columns="tableColumns" :data="fetchData" stripe /> -->
  <ProTable
    ref="proTable"
    title="用户列表"
    highlight-current-row
    :columns="tableColumns"
    :request-api="getUserList"
  ></ProTable>
  <!-- :row-class-name="tableRowClassName"
    :span-method="objectSpanMethod"
    :show-summary="true"
    :summary-method="getSummaries"
    @row-click="rowClick" -->
  <el-button @click="focusHandler">聚焦</el-button>
  <my-input v-model="msg" ref="myInputRef">
    <template #prepend>Prepend</template>
    <template #append>Append</template>
  </my-input>
</template>

<script setup lang="jsx">
const myInputRef = ref()

import { useUserStore } from '@/stores/user'
// getUsers
import { getUserList } from '@/apis/user'
const userStore = useUserStore()

import proTable from '@/components/ProTable/index.vue'

// 表格列配置

const tableColumns = ref([
  {
    label: '名称',
    prop: 'username',
    width: '150'
  },
  {
    label: '描述',
    prop: 'description'
  },
  {
    label: '手机',
    prop: 'phone',
    dataIndex: 'phone'
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

const msg = ref('')

const focusHandler = () => {
  console.log(
    '%c [  ]-57',
    'font-size:13px; background:pink; color:#bf2c9f;',
    myInputRef.value
  )
  myInputRef.value.focus()
}
</script>
