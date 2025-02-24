<template>
  <div>
    <canvas ref="canvas" width="800" height="600"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
const ctx = ref(null)
const offscreenCanvas = ref(null)
const offscreenCtx = ref(null)

let circles = []
const numCircles = 50

// 初始化圆形位置
const initCircles = () => {
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: Math.random() * 800,
      y: Math.random() * 600,
      radius: Math.random() * 20 + 5,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 - 1
    })
  }
}

// 离屏 canvas 绘制函数（缓存）
const drawCircles = () => {
  offscreenCtx.value.clearRect(
    0,
    0,
    offscreenCanvas.value.width,
    offscreenCanvas.value.height
  )

  circles.forEach((circle) => {
    circle.x += circle.dx
    circle.y += circle.dy

    // 如果圆形碰到边缘，反转方向
    if (circle.x < 0 || circle.x > 800) circle.dx = -circle.dx
    if (circle.y < 0 || circle.y > 600) circle.dy = -circle.dy

    // 绘制圆形到离屏 canvas
    offscreenCtx.value.beginPath()
    offscreenCtx.value.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
    offscreenCtx.value.fillStyle = 'rgba(0, 150, 255, 0.5)'
    offscreenCtx.value.fill()
    offscreenCtx.value.closePath()
  })
}

// 动画渲染函数
const render = () => {
  drawCircles() // 更新离屏 canvas

  // 将离屏 canvas 的内容复制到主 canvas
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height) // 清除主 canvas
  ctx.value.drawImage(offscreenCanvas.value, 0, 0) // 将缓存内容绘制到主 canvas

  // 使用 requestAnimationFrame 进行下次渲染
  requestAnimationFrame(render)
}

// 生命周期管理
onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d')
    offscreenCanvas.value = document.createElement('canvas')
    offscreenCtx.value = offscreenCanvas.value.getContext('2d')
    offscreenCanvas.value.width = canvas.value.width
    offscreenCanvas.value.height = canvas.value.height

    initCircles() // 初始化圆形
    render() // 启动动画
  }
})

onBeforeUnmount(() => {
  // 清理资源
  cancelAnimationFrame(render)
})
</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>
