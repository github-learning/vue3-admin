<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="用户列表"
      highlight-current-row
      :columns="tableColumns"
      :request-api="getUserList"
    >
    </ProTable>
  </div>

  <el-button @click="focusHandler">聚焦</el-button>
  <my-input v-model="msg" ref="myInputRef">
    <template #prepend>Prepend</template>
    <template #append>Append</template>
  </my-input>
  <my-button></my-button>
</template>

<script setup lang="jsx">
const myInputRef = ref()

import { useUserStore } from '@/stores/user'

import { getUserList } from '@/apis/user'

// import { ProTableInstance } from '@/components/ProTable/model'
const userStore = useUserStore()
// ProTable 实例
const proTable = ref()

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
    dataIndex: 'status',
    valueType: 'select',
    render: (row) => {
      return (
        <span style={{ color: row.status == 0 ? 'red' : 'green' }}>
          {row.status == 0 ? '禁用' : '正常'}
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
      const handleEdlAction = (row) => {
        console.log(
          '%c [删除的时候再刷新接口  ]-90',
          'font-size:13px; background:pink; color:#bf2c9f;'
        )

        proTable.value.getTableList()
      }
      return (
        <>
          <el-button type="primary" onClick={() => handleAction(row)}>
            新增
          </el-button>
          <el-button onClick={() => handleAction(row)}>编辑</el-button>
          <el-button type="danger" onClick={() => handleEdlAction(row)}>
            删除
          </el-button>
        </>
      )
    }
  }
])

const msg = ref('')

const focusHandler = () => {
  console.log(
    '%c [  ]-57',
    'font-size:13px; background:pink; color:#bf2c9f;',
    myInputRef.value
  )
  // myInputRef.value.focus()
}
</script>
