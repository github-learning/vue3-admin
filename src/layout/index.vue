<template>
  <el-container class="common-layout">
    <el-aside :width="aside" class="aside">
      <div class="flex flex-col h-full">
        <div class="flex items-center">
          <img src="../assets/logo.png" alt="" class="w-[60px] ml-2" />
          <span> KKKAdmin</span>
        </div>
        <layout-menu class="grow" />
      </div>
    </el-aside>
    <el-container>
      <el-header class="border-b-solid border-1 border-[var(--color-border)]">
        <layout-header v-model="isDispaly"></layout-header>
      </el-header>
      <el-main style="background-color: var(--color-bg)">
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

<script setup lang="ts">
const isDispaly = ref(true)
const aside = computed<string>(() => {
  return isDispaly.value ? '12.5em' : '0em'
})
</script>

<style lang="scss">
.common-layout {
  position: relative;
  height: 100vh;
  .aside {
    transition: width 0.5s;
    @apply overflow-x-hidden border-r-solid border-1 border-[var(--color-border)] md:block;
  }
  .el-menu {
    border-right: none;
  }
  .el-header {
    padding: 0;
    height: 4.25rem;
    display: flex;
    align-items: center;
  }
  // .el-main {
  // 	padding: 1.25rem;
  // }
}
</style>
