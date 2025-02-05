<template>
  <!-- <proTable :table-columns="tableColumns" :data="fetchData" stripe /> -->
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="用户列表"
      highlight-current-row
      :columns="tableColumns"
      :request-api="getUserList"
    ></ProTable>
  </div>
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
import { Cellphone } from '@element-plus/icons-vue'
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
    width: '150',
    dataIndex: 'username',
    render: (row) => {
      return <el-tag type="primary">{row.username}</el-tag>
    }
  },
  {
    label: '描述',
    prop: 'description'
  },
  {
    label: '手机',
    prop: 'mobile',
    dataIndex: 'mobile',
    render: (row) => {
      return (
        <>
          {row.mobile ? (
            <el-icon>
              <Cellphone />
            </el-icon>
          ) : null}{' '}
          {row.mobile}
        </>
      )
    }
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
    width: '280',
    render: (row) => {
      const handleAction = (row) => {
        console.log(
          '%c [ row ]-71',
          'font-size:13px; background:pink; color:#bf2c9f;',
          row
        )
      }
      return (
        <>
          <el-button type="primary" onClick={() => handleAction(row)}>
            新增
          </el-button>
          <el-button onClick={() => handleAction(row)}>编辑</el-button>
          <el-button type="danger" onClick={() => handleAction(row)}>
            删除
          </el-button>
        </>
      )
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
