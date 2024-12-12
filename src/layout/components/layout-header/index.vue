<!-- <template>
  {{ $route.meta.title }}
</template> -->

<template>
  <div class="navbar" flex items-center px-2 justify-between>
    <!-- {{ $route.meta.title }} -->
    <!-- <hamburger
      @toggleCollapse="toggleSidebar"
      :collapse="sidebar.opened"
    ></hamburger> -->
    <button
      type="button"
      @click="isDispaly = !isDispaly"
      class="border-none bg-transparent h-8 w-8 flex justify-center items-center hover:bg-slate-200 rounded-md cursor-pointer mr-2"
    >
      <el-icon :size="20" color="var(--color-icon)" v-show="isDispaly">
        <Fold />
      </el-icon>
      <el-icon :size="20" color="var(--color-icon)" v-show="!isDispaly">
        <Expand />
      </el-icon>
    </button>
    <!-- 面包屑组件 -->
    <breadCrumb></breadCrumb>

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
  @apply h-[var(--navbar-height)] w-full;
}
</style>

<script lang="ts" setup>
// import { useAppStore } from '@/stores/app'
// 在解构的时候要考虑值是不是对象，如果非对象解构出来就 丧失响应式了
// const { toggleSidebar, sidebar } = useAppStore()

const isDispaly = defineModel()

const emit = defineEmits<{
  (event: 'showSetting', isShow: boolean): void
}>()

const openShowSetting = () => {
  emit('showSetting', true)
}
</script>
