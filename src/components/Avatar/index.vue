<template>
  <el-dropdown>
    <img :src="avatar" size-40px rounded-sm cursor-pointer outline-none />
    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <router-link to="/profile/index">
          <el-dropdown-item>个人设置</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click="logout">
          <span block @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import avatar from '@/assets/vue.svg'
import { useUserStore } from '@/stores/user'
const store = useUserStore()
const { proxy } = getCurrentInstance()!
const logout = () => {
  store.logout()
  proxy?.$message.success('退出成功')
  window.location.reload()
}
</script>
