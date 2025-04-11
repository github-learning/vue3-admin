class AsyncQueue {
  constructor(concurrency) {
    // 任务队列，用于存储待执行的任务
    this.queue = []
    // 当前正在运行的任务数量
    this.running = 0
    // 最大并发数
    this.concurrency = concurrency
  }

  addTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = async () => {
        // 开始执行任务，增加正在运行的任务数量
        this.running++
        try {
          // 执行任务并获取结果
          const result = await task()
          // 任务成功完成，将结果传递给 Promise 的 resolve 方法
          resolve(result)
        } catch (error) {
          // 任务执行出错，将错误信息传递给 Promise 的 reject 方法
          reject(error)
        } finally {
          // 任务执行完毕，减少正在运行的任务数量
          this.running--
          // 尝试从队列中取出下一个任务执行
          this.runNext()
        }
      }

      if (this.running < this.concurrency) {
        // 如果当前运行的任务数小于最大并发数，立即执行任务
        taskWrapper()
      } else {
        // 否则将任务放入队列等待
        this.queue.push(taskWrapper)
      }
    })
  }

  runNext() {
    if (this.queue.length > 0 && this.running < this.concurrency) {
      // 若队列中有任务且当前运行任务数小于最大并发数，取出一个任务执行
      const nextTask = this.queue.shift()
      nextTask()
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

// 设置最大并发数为 5
const concurrency = 5
const queue = new AsyncQueue(concurrency)
const taskCount = 1000
for (let i = 0; i < taskCount; i++) {
  queue.addTask(asyncFunc(i))
}
