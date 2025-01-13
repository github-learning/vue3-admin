let arr = [{ a: 1 }]
let a = arr.map((item) => {
  return {
    ...item,
    is: 'te'
  }
})

console.log('%c [  ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', a)
