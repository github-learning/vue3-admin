<script setup lang="ts">
defineProps<{ msg: string }>()

import { getCurrentInstance } from 'vue'
// const count = ref(0)
import { useCounterStore } from '../stores/counter-store'
import { storeToRefs } from 'pinia'

const store = useCounterStore()

const { count, doubleCount } = storeToRefs(store)

const { increment } = store
// 将服务型的组件，放到实例上调用
// import { ElMessage } from 'element-plus'
const { proxy } = getCurrentInstance()!

const infoTip = () => {
  // ElMessage('This is a message.')
  proxy?.$message('This is a message.')
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <el-button type="primary" @click="increment()">
      <el-icon><House /></el-icon>
      <span class="info">
        count is {{ count }} doubleCount is {{ doubleCount }}</span
      >
    </el-button>
    <el-button type="info" @click="infoTip">info message</el-button>
    <!-- <button type="button" @click="count++">count is {{ count }}</button> -->
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.info {
  @apply text-red;
}
</style>
