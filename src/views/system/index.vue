<template>
  <div p-30px>
    <h2>角色管理</h2>
    <el-button @click="hanleAddRole">角色添加</el-button>

    <el-table :data="roles" style="width: 100%">
      <el-table-column prop="id" label="角色id" width="180" />
      <el-table-column prop="name" label="角色名称" width="180" />
      <el-table-column prop="description" label="描述" />
      <el-table-column
        prop="is_default"
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
      :total="count"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- <right-panel v-model="visible" :title="panelTitle">
      <editor-role
        :type="editType"
        :data="editData"
        @submit="handleSubmit"
      ></editor-role>
    </right-panel>
    <role-menu
      :role="roleData"
      v-model="roleMenuVisible"
      v-if="roleMenuVisible && roleData"
    ></role-menu> -->
  </div>
</template>

<script setup>
import { getRoles } from '@/apis/role'

// const pageNum = ref(0)
// const pageSize = ref(10)
const roles = ref([])
const formatter = (row) => {
  return row.is_default ? '是' : '否'
}
const getRolesList = async () => {
  const data = await getRoles()

  console.log(
    '%c [  ]-14',
    'font-size:13px; background:pink; color:#bf2c9f;',
    data
  )
  roles.value = data.data
}
onMounted(() => {
  getRolesList()
})
</script>

<style scoped></style>
