<template>
  <div class="user-container" p-30px>
    <h2>用户管理</h2>
    <el-button type="primary" plain @click="handleAddUser"> 添加用户</el-button>
    <el-form :inline="true" :model="formQuery" ref="queryFormRef">
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="formQuery.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="formQuery.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status" w-200px>
        <el-select v-model="formQuery.status" placeholder="状态">
          <el-option label="全部" value="all"></el-option>
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="正常" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmitQuery">查询</el-button>
        <el-button type="default" @click="handleResetFeilds">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="user-list">
      <el-table :data="users" max-height="400">
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="mobile" label="手机"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="status" label="状态" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              link
              @click="handleEditUser(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              link
              @click="handleDeleteUser(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="user-container">
        <div class="user-list">
          <!--用户展示-->
          <div class="user-pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              :total="total"
              :page-sizes="[1, 5, 10, 20]"
              :page-size="pageSize"
              layout="total, prev, pager, next, sizes,jumper"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <right-panel v-model="panelVisible" :title="panelTitle" :size="330">
      <editor-user
        :type="editType"
        :data="editData"
        @submit="handleSubmitUser"
      />
    </right-panel>
  </div>
</template>

<script lang="ts" setup>
import type { IUserQuery, Profile } from '@/apis/user'
import { useRoleStore } from '@/stores/role'
import { IProfileQuery, useUserStore } from '@/stores/user'
import { FormInstance } from 'element-plus'
const store = useUserStore()
// 用户列表
const users = computed(() => store.state.users)
// 分页相关状态
const pageNum = ref(0)
const pageSize = ref(10)
// 获取用户列表 支持分页
const getUserList = () => {
  store.getAllUsers({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    ...formQuery
    // ... 搜索条件
  } as unknown as IUserQuery)
}
// 格式化status
const formatter = (row: Profile) => {
  return row.status ? '正常' : '禁用'
}
// 不使用watchEffect
onMounted(() => {
  getUserList()
})
// 删除用户
const { proxy } = getCurrentInstance()!
const handleDeleteUser = async (index: number, row: Profile) => {
  try {
    await proxy?.$confirm(`您确认要删除用户${row.username}吗？`, '删除确认', {
      type: 'warning'
    })
    await store.removeUser({
      id: row.id,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    } as IProfileQuery)
    proxy?.$message.success('用户删除成功')
  } catch {
    proxy?.$message({
      type: 'info',
      message: '已取消删除'
    })
  }
}
const handleEditUser = (index: number, row: Profile) => {
  editType.value = 0
  editData.value = { ...row }
  // 获取当前编辑用户 现有角色列表
  editData.value.roleIds = row.roles.map((item) => item.id)
  editData.value.roles = roles.value! // 所有角色列表
  panelVisible.value = true
}
// 用户总条数
const total = computed(() => store.state.count)
// 分页
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getUserList()
}
const handleCurrentChange = (val: number) => {
  pageNum.value = val - 1 // 页码后端是从0开始的
  getUserList()
}

// 查询参数
const formQuery = reactive({
  username: '',
  status: 'all',
  mobile: ''
})
const handleSubmitQuery = () => {
  getUserList()
}

// 重置
const queryFormRef = useTemplateRef<FormInstance | null>('queryFormRef')
const handleResetFeilds = () => {
  ;(queryFormRef.value as FormInstance).resetFields()
  getUserList()
}

const editData = ref<Profile | undefined>(undefined)
// 控制面板显示
const panelVisible = ref(false)
const editType = ref(1)
const panelTitle = computed(() =>
  editType.value === 1 ? '新增用户' : '编辑用户'
)
const storeRole = useRoleStore()
storeRole.getRoles({ pageNum: pageNum.value, pageSize: pageSize.value })
const roles = computed(() => storeRole.state.roles) // 角色

const handleAddUser = () => {
  editType.value = 1
  editData.value = {} as Profile
  editData.value.roles = roles.value // 所有角色列表
  editData.value.roleIds = [] // 所选角色id列表
  panelVisible.value = true
}
const editUser = async (data: IProfileQuery) => {
  store.editUser({
    ...data,
    pageSize: pageSize.value,
    pageNum: pageNum.value
  })
  ;(queryFormRef.value as FormInstance).resetFields()
  proxy?.$message.success('用户编辑成功')
  panelVisible.value = false
}
const handleSubmitUser = (data: Profile) => {
  if (editType.value === 1) {
    // 新增
    addNewUser(data)
  } else {
    editUser(data)
  }
}
const addNewUser = (data: Profile) => {
  store.addUser({
    ...data,
    pageSize: pageSize.value,
    pageNum: pageNum.value
  })
  ;(queryFormRef.value as FormInstance).resetFields()
  proxy?.$message.success('用户添加成功')
  panelVisible.value = false
}
</script>
