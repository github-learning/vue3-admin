<template>
  <template v-for="(item, index) in menuData">
    <el-sub-menu v-if="item.children?.length" :key="index" :index="item.path">
      <template #title>
        <span class="menu-item-title"> {{ item.meta?.title }}</span>
      </template>
      <MenuTree :key="index" :menu-data="item.children"></MenuTree>
    </el-sub-menu>
    <el-menu-item v-else :key="item.path" :index="item.path" class="menu-item">
      <template #title>
        <span class="menu-item-title">{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'
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
<style></style>
