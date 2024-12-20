<template>
  <template v-for="(item, index) in menuData">
    <el-sub-menu v-if="item.children?.length" :key="index" :index="item.path">
      <template #title>
        <span> {{ item.meta?.title }}</span>
      </template>
      <MenuTree :key="index" :menu-data="item.children"></MenuTree>
    </el-sub-menu>

    <!-- 判断是否是 HTTP 链接 -->
    <template v-else-if="isExternal(item.path)">
      <el-menu-item :key="item.path" class="menu-item">
        <a :href="item.path" target="_blank" rel="noopener noreferrer">
          {{ item.meta?.title }}
        </a>
      </el-menu-item>
    </template>

    <el-menu-item v-else :key="item.path" :index="item.path">
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

import { isExternal } from '@/utils/validate'
const props = defineProps<{
  menuData: RouteRecordRaw[]
}>()

console.log(
  '%c [ props ]-23',
  'font-size:13px; background:pink; color:#bf2c9f;',
  props.menuData
)

defineOptions({
  name: 'MenuTree'
})
</script>
<style lang="scss" scoped>
.menu-item a {
  @apply color-[--el-menu-text-color] w-400;
}
</style>
