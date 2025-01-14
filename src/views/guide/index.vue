<template>
  <div>
    <ProTable
      :query-fields="queryFields"
      :table-columns="tableColumns"
      :data="fetchData"
      stripe
    >
      <!-- <template #status="{ row }">
        <span :style="{ color: row.status == 'active' ? 'red' : 'green' }">{{
          row.status
        }}</span>
      </template>
      <template #action="{ row }">
        <button @click="handleAction(row)">操作按钮</button>
      </template> -->
    </ProTable>
  </div>
</template>

<script setup>
// lang="jsx"
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
  // {
  //   label: '状态',
  //   prop: 'status',
  //   dataIndex: 'status',
  //   width: '100'
  // },
  // {
  //   title: '操作',
  //   width: '180px',
  //   dataIndex: 'action',
  //   fixed: 'right'
  // }
  {
    label: '状态',
    prop: 'status',
    width: '150',
    render: (row) => (row.status === 'active' ? '🟢 Active' : '🔴 Inactive')
  },
  {
    label: '操作',
    prop: 'action',
    width: '180',
    render: () => '操作 '
    // render() {
    //   return (
    //     <div>
    //       <button onClick={() => console.log('按钮点击')}>操作按钮</button>
    //     </div>
    //   )
    // }
    // render: (row) => '<button>操作按钮</button>'
    // render: (row) => {
    //   const rowData = { ...row } // 解包以去除响应式特性
    //   console.log(JSON.stringify(rowData))
    //   return <button onClick={() => handleAction(rowData)}>操作按钮</button>
    //return <button onClick={() => handleAction(row)}>操作按钮</button>
    // }
  }
]
//   <el-button>22</el-button>

// 模拟请求数据的方法
const fetchData = ref([
  { name: '张三', status: 'active' },
  { name: '李四', status: 'inactive' },
  { name: '王五', status: 'active' }
])

// const handleAction = (raw) => {
//   console.log(
//     '%c [  ]-85',
//     'font-size:13px; background:pink; color:#bf2c9f;',
//     raw
//   )
// }
</script>
