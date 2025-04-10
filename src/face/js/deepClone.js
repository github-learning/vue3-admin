// 定义一个深度克隆函数，接受两个参数：要克隆的对象和缓存对象
const deepClone = (obj, cache = new WeakMap()) => {
  if (typeof obj !== 'object' || obj === null) return obj

  if (cache.has(obj)) return cache.get(obj)

  const clone = Array.isArray(obj) ? [] : {}

  cache.set(obj, clone)

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key], cache)
    }
  }
  return clone
}

const a = { val: 1 }
const b = { a }
a.b = b

const cloned = deepClone(a)

console.log(
  '%c [  ]-24',
  'font-size:13px; background:pink; color:#bf2c9f;',
  cloned
)
console.log(cloned.b.a === cloned) // true ✅
