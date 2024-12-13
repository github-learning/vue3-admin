<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item
      v-for="{ name, path } in breadcrumbList"
      :key="path"
      :to="path"
    >
      {{ name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
const route = useRoute()
// 获取当前路由信息
const breadcrumbList = computed(() => {
  return route.matched
    .map((item) => {
      return {
        name: item.meta.title,
        path: item.path
      }
    })
    .slice(1)
})
</script>

<style lang="scss" scoped></style>
