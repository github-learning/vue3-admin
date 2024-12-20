<template>
  <!-- v-if="filteredChildren.length <= 1 && !item.meta?.alwaysShow" -->
  <!-- <sidebar-item-link :to="item.path">
    <el-menu-item :index="item.path">
      <template #title>{{ item.meta?.title }}</template>
    </el-menu-item>
  </sidebar-item-link> -->
  <template v-for="(item, index) in menuData">
    <el-sub-menu v-if="item.children?.length" :key="index" :index="item.path">
      <template #title>
        <span class="menu-item-title"> {{ item.meta?.title }}</span>
      </template>
      <MenuTree :key="index" :menu-data="item.children"></MenuTree>
    </el-sub-menu>
    <el-menu-item v-else :key="item.path" :index="item.path" class="menu-item">
      <template #title>
        <!-- 如果是外链，使用 a 标签包裹 -->
        <span v-if="item.meta?.link" class="menu-item-title">
          <!-- <a :href="item.meta?.link" target="_blank">{{ item.meta?.title }}</a> -->
        </span>

        <!-- 如果不是外链，使用正常的内部链接 -->
        <span v-else class="menu-item-title">{{ item.meta?.title }}</span>
        <span class="menu-item-title">{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'
// import SidebarItemLink from './SidebarItemLink.vue'
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
