class AsyncTaskQueue {
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
    } catch (error) {
      console.log(
        '%c [  ]-69',
        'font-size:13px; background:pink; color:#bf2c9f;',
        error
      )
      this.runing = false
    }
  }
}
// const queue = new AsyncTaskQueue()
// const taskNum = 100
// const taskFunction = (i) => {
//   return () =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         console.log(`${i}`)
//         resolve()
//       }, 1000)
//     })
// }
// for (let i = 0; i < taskNum; i++) {
//   queue.addTask(taskFunction(i))
// }
const nums = [2, 3, 5, 7, 8, 9]
const target = 11
const twoSum = (arr, target) => {
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    let diff = target - arr[i]
    if (map.get(diff)) {
      return [map.get(diff), i]
    }
    map.set(arr[i], i)
  }
  return []
}

console.log(
  '%c [  ]-103',
  'font-size:13px; background:pink; color:#bf2c9f;',
  twoSum(nums, target)
)

const dataTree = [
  { id: 1, parentId: null, name: '根节点' },
  { id: 2, parentId: 1, name: '节点 1' },
  { id: 3, parentId: 1, name: '节点 2' },
  { id: 4, parentId: 2, name: '节点 1-1' },
  { id: 5, parentId: 2, name: '节点 1-2' },
  { id: 6, parentId: 3, name: '节点 2-1' }
]
const buildTree = (data) => {
  const tree = []
  const map = new Map()
  data.forEach((element) => {
    map.set(element.id, { ...element, children: [] })
  })
  data.forEach((item) => {
    let parentId = item.parentId
    if (parentId === null) {
      tree.push(map.get(item.id))
    } else {
      let parent = map.get(item.parentId)
      parent.children.push(map.get(item.id))
    }
  })
  return tree
}

const tree = buildTree(dataTree)

console.log(
  '%c [  ]-124',
  'font-size:13px; background:pink; color:#bf2c9f;',
  JSON.stringify(tree, null, 2)
)

const flattenTree = (tree, parentId = null) => {
  let result = []
  for (let node of tree) {
    result.push({
      id: node.id,
      parentId: node.parentId,
      name: node.name
    })
    result = result.concat(flattenTree(node.children, parentId))
  }
  return result
}

console.log(
  '%c [  ]-155',
  'font-size:13px; background:pink; color:#bf2c9f;',
  flattenTree(tree)
)
