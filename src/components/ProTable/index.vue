<template>
  <div v-for="item in components" :key="item.name">
    <!-- 将 props 传递给动态渲染的组件 -->
    <component :is="item" v-bind="props" />
  </div>
</template>

<script setup>
import search from './components/search.vue'
import tableColumn from './components/tableColumn'
// import Pagination from './components/Pagination.vue'

const props = defineProps({
  tableColumns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  }
})
console.log('props', props)
const components = [tableColumn]
</script>

<style lang="scss" scoped></style>
