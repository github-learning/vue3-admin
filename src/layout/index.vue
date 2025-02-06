<template>
  <el-container class="common-layout">
    <el-aside :width="asideStyle" class="aside">
      <div class="flex flex-col h-full">
        <div class="flex items-center">
          <img src="@/assets/logo.png" alt="" class="w-[60px] ml-2" />
          <span>KKKAdmin</span>
        </div>
        <layout-menu class="grow" />
      </div>
    </el-aside>
    <el-container>
      <el-header class="border-b-solid border-1 border-[var(--color-border)]">
        <layout-header v-model="isDisPlay"></layout-header>
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
    <base-global-dialog></base-global-dialog>
  </el-container>
</template>

<script setup lang="ts">
const isDisPlay = ref(true)
const asideStyle = computed<string>(() => {
  return isDisPlay.value ? '12.5em' : '0'
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
}
</style>
