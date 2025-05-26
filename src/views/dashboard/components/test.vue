<template>
  <div>传递来的 {{ count }}</div>
  <div>double {{ double }}</div>
</template>

<script setup>
const props = defineProps({
  count: Number
})
/**
 * 响应式
函数和数据的关联
被监控的函数
  vue2 Watcher  vue3 effect

render / computed / watchEffect / watch
函数运行期间，用到了响应式数据
ref / reactive

响应式数据变化，会导致函数重新运行
 * 
 */
// const double = ref(props.count * 2)
const double = computed(() => {
  return props.count * 2
})

const person = shallowRef(1)
</script>

<style lang="scss" scoped></style>
