<template>
  <div p-30px>
    <h2>角色管理</h2>
    <el-button @click="hanleAddRole">角色添加</el-button>
    <el-table :data="roles" style="width: 100%">
      <el-table-column prop="id" label="角色id" width="180" />
      <el-table-column prop="name" label="角色名称" width="180" />
      <el-table-column prop="description" label="描述" />
      <el-table-column
        prop="isDefault"
        label=" 默认角色"
        :formatter="formatter"
      />
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <el-button link @click="handleRoleMenu(scope.row)"
            >菜单权限</el-button
          >
          <el-button link @click="handleEditRole(scope.row)">编辑</el-button>
          <el-button link @click="handleRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[1, 5, 10, 20]"
      layout="prev, pager, next, sizes, total"
      :total="total"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-drawer v-model="visible" :title="panelTitle">
      <editor-role
        :type="editType"
        :data="editData"
        @submit="handleSubmit"
      ></editor-role>
    </el-drawer>
    <role-menu
      :role="roleData"
      v-model="roleMenuVisible"
      v-if="roleMenuVisible && roleData"
    ></role-menu>
  </div>
</template>
<script lang="ts" setup>
import { IRole } from '@/apis/role'
import { useRoleStore } from '@/stores/role'

import { useRoleHelpers } from './roleHelpers'

const roleData = ref<IRole | null>(null)
const roleMenuVisible = ref(false)
const handleRoleMenu = (row: IRole) => {
  roleMenuVisible.value = true
  roleData.value = row
}

// --------------------------
const store = useRoleStore()
const { total, roles } = toRefs(store.state)
const pageNum = ref(1)
const pageSize = ref(10)
const {
  handleSubmit,
  handleRemove,
  handleEditRole,
  hanleAddRole,
  panelTitle,
  editType,
  visible,
  editData
} = useRoleHelpers({ pageNum, pageSize })
watchEffect(() => {
  store.getRoles({ pageNum: pageNum.value, pageSize: pageSize.value })
})
const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  pageNum.value = val
}
const formatter = (row: IRole) => {
  return row.isDefault ? '是' : '否'
}
</script>
