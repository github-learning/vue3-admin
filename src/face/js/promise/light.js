// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

// async function light(color, duration) {
//   console.log(`${color} 灯亮了`)
//   // 模拟亮灯的时间
//   await delay(duration)
// }

// async function startTrafficLight() {
//   while (true) {
//     await light('🔴 红', 3000)
//     await light('🟡 黄', 2000)
//     await light('🟢 绿', 1000)
//   }
// }

// startTrafficLight()

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
async function light(color, ms) {
  console.log(`${color}`)
  await delay(ms)
}
async function startTrafficLight() {
  while (true) {
    await light('33', 3000)
    await light('22', 2000)
    await light('11', 1000)
  }
}
startTrafficLight()
