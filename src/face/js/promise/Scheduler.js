// // 异步任务，一个一个执行
// /**
//  * 1. 将任务放到队列，
//  */
// // const asyncTask = (i) => {
// //   return () =>
// //     new Promise((resolve) => {
// //       setTimeout(() => {
// //         console.log(`${i}`)
// //         resolve()
// //       }, 1000)
// //     })
// // }

// class AsyncTaskQueue {
//   constructor() {
//     this.queue = []
//     this.runing = false
//   }
//   addTask(task) {
//     this.queue.push(task)
//     if (!this.runing) {
//       this.runTask()
//     }
//   }
//   async runTask() {
//     if (this.queue.length === 0) {
//       this.runing = true
//       return
//     }
//     const task = this.queue.shift()
//     this.runing = true
//     try {
//       await task()
//       this.runTask()
//     } catch {
//       console.log('err')
//     }
//   }
// }
// const asyncTask = (i) => {
//   return () =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         console.log(`${i}`)
//         resolve()
//       }, 1000)
//     })
// }
// const askCount = 1000
// const queue = new AsyncTaskQueue()
// for (let i = 0; i < askCount; i++) {
//   queue.addTask(asyncTask(i))
// }

// class AsyncTaskQueue {
//   constructor(concurrency) {
//     this.queue = []
//     this.running = 0
//     this.concurrency = concurrency
//   }

//   addTask(task) {
//     return new Promise((resolve, reject) => {
//       const taskWrapper = async () => {
//         this.running++

//         console.log(
//           '%c [  ]-68',
//           'font-size:13px; background:pink; color:#bf2c9f;',
//           this.running
//         )
//         try {
//           const result = await task()
//           resolve(result)
//         } catch (error) {
//           reject(error)
//         } finally {
//           this.running--
//           this.runNext()
//         }
//       }

//       if (this.running < this.concurrency) {
//         taskWrapper()
//       } else {
//         this.queue.push(taskWrapper)
//       }
//     })
//   }

//   runNext() {
//     if (this.queue.length > 0 && this.running < this.concurrency) {
//       const nextTask = this.queue.shift()
//       nextTask()
//     }
//   }
// }

// const asyncTask = (i) => {
//   return () =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         console.log(`${i}`)
//         resolve()
//       }, 1000)
//     })
// }

// const concurrency = 5 // 这里设置最大并发数为 5
// const askCount = 1000
// const queue = new AsyncTaskQueue(concurrency)
// for (let i = 0; i < askCount; i++) {
//   queue.addTask(asyncTask(i))
// }

// class AsyncQueue {
//   constructor() {
//     this.queue = []
//     this.runing = false
//   }
//   addTask(task) {
//     this.queue.push(task)
//     if (!this.runing) {
//       this.runTask()
//     }
//   }
//   async runTask() {
//     if (this.queue.length === 0) {
//       this.runing = false
//       return
//     }
//     const task = this.queue.shift()
//     this.runing = true
//     try {
//       await task()
//       this.runTask()
//     } catch {
//       console.log('err')
//       this.runing = true
//     }
//   }
// }
// const queue = new AsyncQueue()
// const taskCount = 1000
// const asyncFunc = (i) => {
//   return () =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         console.log(`${i}`)
//         resolve()
//       }, 1000)
//     })
// }
// for (let i = 0; i < taskCount; i++) {
//   queue.addTask(asyncFunc(i))
// }
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
      this.runing = true
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
const taskCount = 1000
for (let i = 0; i < taskCount; i++) {
  queue.addTask(asyncFunc(i))
}
