<template>
  <el-container class="common-layout">
    <el-aside :width="'200px'" class="md:block"> <layout-menu /></el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <el-scrollbar>
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.common-layout {
  position: relative;
  height: 100vh;

  .el-menu {
    border-right: none;
  }
  .el-header {
    padding: 0;
    height: 68px;
    display: flex;
    align-items: center;
  }
  // .el-main {
  // 	padding: 20px;
  // }
}
</style>
