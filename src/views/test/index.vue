<template>
  <div>
    <canvas ref="canvas" width="800" height="600"></canvas>
    <button @click="startWatering">浇水</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
const ctx = ref(null)

let waterDroplets = [] // 存储水滴
let particles = [] // 存储粒子效果

// 初始水滴
const createDroplet = () => {
  const droplet = {
    x: 400, // 水滴开始的X坐标
    y: 50, // 水滴开始的Y坐标
    radius: 10, // 水滴大小
    dx: 0, // 水滴的水平速度
    dy: 3, // 水滴的垂直速度
    color: 'rgba(0, 150, 255, 0.6)', // 水滴的颜色
    splashed: false // 标记水滴是否溅起
  }
  waterDroplets.push(droplet)
}

// 粒子效果：模拟水滴溅起的小水珠
const createSplash = (x, y) => {
  const splash = {
    x: x,
    y: y,
    radius: Math.random() * 3 + 1,
    dx: Math.random() * 2 - 1, // 水滴的水平运动
    dy: Math.random() * -2 - 1, // 水滴的垂直运动
    opacity: 1 // 透明度
  }
  particles.push(splash)
}

// 更新水滴位置
const updateDroplets = () => {
  for (let i = 0; i < waterDroplets.length; i++) {
    const droplet = waterDroplets[i]

    if (!droplet.splashed) {
      droplet.y += droplet.dy // 水滴下降
      droplet.dy += 0.1 // 增加重力影响

      // 当水滴接触到地面时，触发溅起效果
      if (droplet.y + droplet.radius >= 550) {
        droplet.splashed = true
        createSplash(droplet.x, droplet.y) // 生成溅起的水珠
      }
    }
  }
}

// 更新溅起的水珠
const updateSplash = () => {
  for (let i = 0; i < particles.length; i++) {
    const splash = particles[i]
    splash.x += splash.dx // 水珠水平运动
    splash.y += splash.dy // 水珠垂直运动
    splash.opacity -= 0.02 // 水珠逐渐消失
    splash.radius -= 0.05 // 水珠逐渐变小

    // 当水珠消失时移除
    if (splash.opacity <= 0 || splash.radius <= 0) {
      particles.splice(i, 1)
      i--
    }
  }
}

// 绘制所有水滴和粒子效果
const draw = () => {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height) // 清除画布

  // 绘制水滴
  for (const droplet of waterDroplets) {
    ctx.value.beginPath()
    ctx.value.arc(droplet.x, droplet.y, droplet.radius, 0, Math.PI * 2)
    ctx.value.fillStyle = droplet.color
    ctx.value.fill()
    ctx.value.closePath()
  }

  // 绘制溅起的水珠
  for (const splash of particles) {
    ctx.value.beginPath()
    ctx.value.arc(splash.x, splash.y, splash.radius, 0, Math.PI * 2)
    ctx.value.fillStyle = `rgba(0, 150, 255, ${splash.opacity})`
    ctx.value.fill()
    ctx.value.closePath()
  }

  // 更新水滴和水珠的状态
  updateDroplets()
  updateSplash()

  requestAnimationFrame(draw) // 循环动画
}

// 启动浇水
const startWatering = () => {
  createDroplet() // 创建一个新的水滴
}

// 初始化 Canvas 和动画
onMounted(() => {
  ctx.value = canvas.value.getContext('2d')
  draw() // 启动绘制和动画
})
</script>

<style scoped>
button {
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
}
</style>
