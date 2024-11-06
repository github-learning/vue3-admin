<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      router
      :default-active="$route.path"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
    >
      <menu-tree :menu-data="layoutsRoutes"> </menu-tree>
    </el-menu>
  </div>
</template>

<script setup>
import { layoutsRoutes } from '@/router'
</script>

<style scoped>
.sidebar {
  height: 100vh;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu {
  min-height: 100%;
}
</style>
