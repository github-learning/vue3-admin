var obj = { a: { b: { c: 2 } } }
// const get = (obj, path) => {
//   const keys = path.split('.')
//   let result = obj
//   for (let key of keys) {
//     result = result[key]
//   }
//   return result
// }
const get = (obj, path) => {
  const keys = path.split('.')
  let result = obj
  for (let key of keys) {
    result = result[key]
  }
  return result
}

console.log(get(obj, 'a.b.c')) // 输出 2
