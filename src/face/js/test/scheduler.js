class AsyncQueue {
  constructor() {
    this.queue = []
    this.runing = false
  }
  addTask(task) {
    this.queue.push(task)
    if (!this.runing) {
      this.runTask()
    }
  }
  async runTask() {
    if (this.queue.length === 0) {
      this.runing = false
      return
    }
    const task = this.queue.shift()
    this.runing = true
    try {
      await task()
      this.runTask()
    } catch {
      console.log('err')
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

const queue = new AsyncQueue()
const totalTask = 1000
for (let i = 0; i < totalTask; i++) {
  queue.addTask(asyncFunc(i))
}
