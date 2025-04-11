class AsyncQueue {
  constructor(count) {
    this.count = count
    this.queue = []
    this.currentCount = 0
  }
  addTask(task) {
    return new Promise((resolve, reject) => {
      const wrapper = async () => {
        this.currentCount++
        try {
          const result = await task()
          resolve(result)
        } catch (err) {
          reject(err)
        } finally {
          this.currentCount--
          this.runTask()
        }
      }
      if (this.currentCount < this.count) {
        wrapper()
      } else {
        this.queue.push(wrapper)
      }
    })
  }
  runTask() {
    if (this.queue.length && this.currentCount < this.count) {
      const task = this.queue.shift()
      task()
    }
  }
}
const asyncFunc = (i) => {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log(`${i}`)
        resolve()
      }, 1000)
    })
}
const count = 2
const queue = new AsyncQueue(count)
const totalTask = 1000
for (let i = 0; i < totalTask; i++) {
  queue.addTask(asyncFunc(i))
}
