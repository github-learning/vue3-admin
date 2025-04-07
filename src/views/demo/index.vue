<template>
  <div>
    <!-- Canvas 用于显示逐帧动画 -->
    <canvas ref="canvas" width="800" height="600"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
const ctx = ref(null)

// 假设我们有三张帧图，模拟逐帧动画
import msg01 from '@/assets/images/msg01.png'
import msg02 from '@/assets/images/msg02.png'
import msg03 from '@/assets/images/msg03.png'

const frames = [msg01, msg02, msg03] // 这里使用图片路径，可以替换成你自己的图片
let currentFrameIndex = 0

// 逐帧动画函数
const drawFrame = () => {
  const img = new Image()
  img.src = frames[currentFrameIndex] // 根据帧索引加载图片

  img.onload = () => {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height) // 清除画布
    ctx.value.drawImage(img, 0, 0) // 绘制当前帧图片
  }

  // 切换到下一帧
  currentFrameIndex = (currentFrameIndex + 1) % frames.length

  // 每 100 毫秒切换一次帧，模拟逐帧动画
  setTimeout(drawFrame, 1000) // 每 100ms 切换一次帧
}

onMounted(() => {
  ctx.value = canvas.value.getContext('2d')
  drawFrame() // 启动逐帧动画
})
</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>
