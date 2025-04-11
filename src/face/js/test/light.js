const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
const light = async (color, ms) => {
  console.log(`${color}`)
  await delay(ms)
}
async function start() {
  while (true) {
    await light('33', 3000)
    await light('22', 2000)
    await light('11', 1000)
  }
}
start()
