class LRUCache {
  constructor(capacity) {
    this.capacity = capacity // 最大缓存容量
    this.cache = new Map() // 用于存储缓存数据（键值对）
  }

  // 获取缓存中的值，若不存在则返回 -1
  get(key) {
    if (!this.cache.has(key)) {
      return -1 // 如果没有缓存该值，返回 -1
    }
    // 如果存在，则将该键值对移到 map 的末尾（表示最近使用）
    const value = this.cache.get(key)
    this.cache.delete(key) // 先删除，再重新插入到末尾
    this.cache.set(key, value)
    return value
  }

  // 设置缓存中的键值对
  put(key, value) {
    // 如果缓存已存在该键，删除旧值，再更新
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    // 如果缓存容量已满，删除最久未使用的元素（map 的第一个元素）
    if (this.cache.size >= this.capacity) {
      // 删除最早插入的元素
      this.cache.delete(this.cache.keys().next().value)
    }

    // 将新值插入到缓存
    this.cache.set(key, value)
  }
}

// 示例使用
const cache = new LRUCache(3)

cache.put(1, 1) // 缓存是 {1=1}
cache.put(2, 2) // 缓存是 {1=1, 2=2}
cache.put(3, 3) // 缓存是 {1=1, 2=2, 3=3}
console.log(cache.get(1)) // 返回 1，缓存是 {2=2, 3=3, 1=1}
cache.put(4, 4) // 缓存是 {3=3, 1=1, 4=4}，删除最久未使用的键值对 2
console.log(cache.get(2)) // 返回 -1 (未找到)
console.log(cache.get(3)) // 返回 3，缓存是 {1=1, 4=4, 3=3}
cache.put(5, 5) // 缓存是 {4=4, 3=3, 5=5}，删除最久未使用的键值对 1
console.log(cache.get(1)) // 返回 -1 (未找到)
console.log(cache.get(4)) // 返回 4，缓存是 {3=3, 5=5, 4=4}
