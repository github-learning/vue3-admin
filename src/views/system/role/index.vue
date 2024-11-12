<template>
  <div>角色</div>
</template>

<script setup lang="ts">
import { getRoles } from './roleApi'

const pageNum = ref(0)
const pageSize = ref(10)
const roles = ref([])
onMounted(() => {
  roles.value = getRoles({
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })

  console.log(
    '%c [ roles ]-17',
    'font-size:13px; background:pink; color:#bf2c9f;',
    roles.value
  )
})
</script>

<style scoped></style>
