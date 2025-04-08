// function asyncTask1() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('Task 1 completed')
//       resolve()
//     }, 1000)
//   })
// }

// function asyncTask2() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('Task 2 completed')
//       resolve()
//     }, 1000)
//   })
// }

// function asyncTask3() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('Task 3 completed')
//       resolve()
//     }, 1000)
//   })
// }

// const tasks = [() => asyncTask1(), () => asyncTask2(), () => asyncTask3()]

// async function runQueue(tasks) {
//   for (const task of tasks) {
//     await task() // 等待上一个任务完成后执行下一个
//   }
// }

// console.log(
//   '%c [  ]-30',
//   'font-size:13px; background:pink; color:#bf2c9f;',
//   runQueue(tasks)
// )
// 模拟异步任务
// function asyncTask(i) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Task ${i} completed`)
//       resolve()
//     }, Math.random() * 1000)
//   })
// }

// // 定义一个 async 函数来执行任务
// async function runTasks() {
//   const taskCount = 1000
//   for (let i = 0; i < taskCount; i++) {
//     await asyncTask(i)
//   }
//   console.log('All tasks completed')
// }

// runTasks()

class AsyncTaskQueue {
  // 构造函数，用于初始化一个新对象
  constructor() {
    // 初始化一个空数组，用于存储队列中的任务
    this.queue = []
    // 初始化一个布尔值，表示队列是否正在运行
    this.isRunning = false
  }

  // 定义一个方法 addTask，用于向任务队列中添加任务
  addTask(task) {
    // 将传入的任务 task 添加到队列 this.queue 的末尾
    this.queue.push(task)

    // 检查当前是否有任务正在执行
    if (!this.isRunning) {
      // 如果没有任务正在执行，则调用 runNextTask 方法开始执行下一个任务
      this.runNextTask()
    }
  }

  // 定义一个异步方法 runNextTask，用于执行队列中的下一个任务
  async runNextTask() {
    // 如果队列为空，则将 isRunning 设置为 false 并返回
    if (this.queue.length === 0) {
      this.isRunning = false
      return
    }
    // 将 isRunning 设置为 true，表示队列正在运行
    this.isRunning = true
    // 从队列中取出第一个任务
    const task = this.queue.shift()
    try {
      // 等待当前任务执行完成
      await task()
      // 当前任务执行完成后，递归调用 runNextTask 方法执行下一个任务
      this.runNextTask()
    } catch (error) {
      // 如果任务执行过程中发生错误，打印错误信息
      console.error('An error occurred:', error)
      // 将 isRunning 设置为 false，表示队列不再运行
      this.isRunning = false
    }
  }
}

// 模拟异步任务
function asyncTask(i) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Task ${i} completed`)
        resolve()
      }, 1000)
    })
}

// 使用示例
const queue = new AsyncTaskQueue()
const taskCount = 3
for (let i = 0; i < taskCount; i++) {
  queue.addTask(asyncTask(i))
}
