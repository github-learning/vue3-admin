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
  <el-space wrap>
    <el-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <el-button class="button" text>Operation button</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ 'List item ' + o }}
      </div>
    </el-card>
  </el-space>

  <div class="card">
    <el-button type="primary" @click="increment()">
      count is {{ count }} doubleCount is {{ doubleCount }}
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
</style>
