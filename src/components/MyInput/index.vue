<template>
  <h1>hello</h1>
  <el-input
    ref="inputRef"
    placeholder="请输入"
    v-bind="$attrs"
    @blur="handlerBlur"
  >
    <template v-for="(_, slot) in $slots" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps"></slot>
    </template>
  </el-input>
</template>

<script setup>
// v-bind="$attrs" : 组件属性透传
// 插槽: $slots ---> slotProps: 插槽属性透传
// 渲染节点： jsx
//1

const inputRef = ref()
/**
 * 挨个暴露
 */
// defineExpose({
//   focus() {
//     inputRef.value.focus()
//   }

// })
/**
 * 通过对象拷贝
 */
// const obj = {}
// onMounted(() => {
//   Object.assign(obj, inputRef.value)
// })
// defineExpose(obj)
/**
 *  通过代理对象暴露
 */
const handlerBlur = () => {
  console.log('失去焦点')
}
defineExpose(
  new Proxy(
    {},
    {
      get(target, key) {
        return inputRef.value?.[key]
      },
      has(target, key) {
        return key in inputRef.value
      }
    }
  )
)
</script>

<style lang="scss" scoped></style>
