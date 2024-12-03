<template>
  <div class="navbar" flex>
    <!-- <hamburger
      @toggleCollapse="toggleSidebar"
      :collapse="sidebar.opened"
    ></hamburger> -->
    <breadcrumb></breadcrumb>
    <div flex justify-end flex-1 items-center mr-20px>
      <screenfull mx-5px></screenfull>
      <el-tooltip content="ChangeSize" placement="bottom">
        <size-select></size-select>
      </el-tooltip>

      <svg-icon
        icon-name="ant-design:setting-outlined"
        size-2em
        @click="openShowSetting"
      ></svg-icon>

      <avatar></avatar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  @apply h-[var(--navbar-height)];
}
</style>

<script lang="ts" setup>
// import { useAppStore } from '@/stores/app'
// 在解构的时候要考虑值是不是对象，如果非对象解构出来就 丧失响应式了
// const { toggleSidebar, sidebar } = useAppStore()

const emit = defineEmits<{
  (event: 'showSetting', isShow: boolean): void
}>()

const openShowSetting = () => {
  emit('showSetting', true)
}
</script>
