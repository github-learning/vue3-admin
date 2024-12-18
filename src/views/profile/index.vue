<template>
  <div class="profile-container">
    <el-card>
      <template #header>
        <div>个人中心</div>
      </template>
      <div v-if="userInfo">
        <div class="avatar">
          <img :src="avatar" />
        </div>
        <div>用户名 {{ userInfo.username }}</div>
        <div>用户角色 {{ roleNames }}</div>
      </div>
    </el-card>

    <el-button v-permission="['super_admin']">添加</el-button>
    <el-button v-permission="['user']">修改</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const userInfo = computed(() => store.state.userInfo)
const avatar = computed(() => userInfo.value.avatar)
const roleNames = computed(() => store.state.roles.map((role) => role.name))
</script>

<style scoped>
.profile-container {
  @apply w-150 mx-auto;
}
</style>
