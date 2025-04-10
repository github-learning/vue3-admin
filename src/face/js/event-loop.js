async function a1() {
  console.log(1)
  await a2()
  console.log(2)
}
async function a2() {
  console.log(3)
}
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
a1()
new Promise((resolve) => {
  console.log(6)
  resolve()
}).then(() => {
  console.log(7)
})
console.log(8)
// 5, 1, 3,6,8,2,7,4
