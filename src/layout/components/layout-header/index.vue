<template>
  <div class="navbar" flex items-center px-2 justify-between>
    <button
      type="button"
      @click="isDisPlay = !isDisPlay"
      class="border-none bg-transparent h-8 w-8 flex justify-center items-center hover:bg-slate-200 rounded-md cursor-pointer mr-2"
    >
      <el-icon :size="20" color="var(--color-icon)" v-show="isDisPlay">
        <Fold />
      </el-icon>
      <el-icon :size="20" color="var(--color-icon)" v-show="!isDisPlay">
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
        @click="emit('showSetting', true)"
      ></svg-icon>

      <avatar></avatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isDisPlay = defineModel()

const emit = defineEmits<{
  (event: 'showSetting', isShow: boolean): void
}>()
</script>

<style scoped lang="scss">
.navbar {
  @apply h-[var(--navbar-height)] w-full;
}
</style>
