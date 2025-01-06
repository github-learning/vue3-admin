<template>
  <component :is="componentType" v-bind="componentProps">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate'

const { to } = defineProps<{
  to: string
}>()

const isExt = computed(() => isExternal(to))
const componentType = computed(() => {
  return isExt.value ? 'a' : 'router-link'
})

const componentProps = computed(() => {
  if (isExt.value) {
    return {
      href: to,
      target: '_blank'
    }
  } else {
    return {
      to
    }
  }
})
</script>
