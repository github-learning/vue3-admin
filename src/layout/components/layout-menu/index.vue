<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      router
      :default-active="$route.path"
      background-color="#fff"
      text-color="#333"
      active-text-color="#2469f0"
    >
      <menu-tree :menu-data="layoutsRoutes"> </menu-tree>
    </el-menu>
  </div>
</template>

<script setup>
import { layoutsRoutes } from '@/router'
</script>

<style scoped>
.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu {
  min-height: 100%;
}
:deep(.el-menu .el-menu-item:hover) {
  outline: 0 !important;
  background-color: #f4f4f5;
}

:deep(.el-sub-menu__title:hover) {
  background-color: #f4f4f5 !important;
}
</style>
