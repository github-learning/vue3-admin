const flatData = [
  { id: 1, name: '根节点', parentId: null },
  { id: 2, name: '子节点1', parentId: 1 },
  { id: 3, name: '子节点2', parentId: 1 },
  { id: 4, name: '子节点1-1', parentId: 2 },
  { id: 5, name: '子节点1-2', parentId: 2 },
  { id: 6, name: '子节点2-1', parentId: 3 }
]

// function buildNestedStructureWithMap(arr) {
//   const map = {}
//   const result = []
//   arr.forEach((el) => {
//     map[el.id] = { ...el, children: [] }
//   })
//   arr.forEach((el) => {
//     if (el.parentId == null) {
//       result.push(map[el.id])
//     } else {
//       map[el.parentId].children.push(map[el.id])
//     }
//   })
//   return result
// }
// const nestedDataWithMap = buildNestedStructureWithMap(flatData)
// console.log(JSON.stringify(nestedDataWithMap, null, 2))
function buildNestedStructureWithMap(arr) {
  // const map = new Map()
  // const result = []
  // arr.forEach((el) => {
  //   map.set(el.id, { ...el, children: [] })
  // })
  // arr.forEach((el) => {
  //   if (el.parentId == null) {
  //     result.push(map.get(el.id))
  //   } else {
  //     map.get(el.parentId).children.push(map.get(el.id))
  //   }
  // })
  // return result
  const map = new Map()
  const tree = []
  arr.forEach((el) => {
    map.set(el.id, {
      ...el,
      children: []
    })
  })
  arr.forEach((el) => {
    let parentId = el.parentId
    if (parentId === null) {
      tree.push(map.get(el.id))
    } else {
      let parent = map.get(el.parentId)
      parent.children.push(map.get(el.id))
    }
  })
  return tree
}
const nestedDataWithMap = buildNestedStructureWithMap(flatData)
console.log(JSON.stringify(nestedDataWithMap, null, 2))

// back
// function flattenTree(tree) {
//     const result = [];

//     tree.forEach(node => {
//         // 提取当前节点（去掉 children 属性）
//         const { children, ...rest } = node;
//         result.push(rest);

//         // 递归处理子节点
//         if (children && children.length) {
//             result.push(...flattenTree(children));
//         }
//     });

//     return result;
// }
function flattenTree(tree, parentId = null) {
  // const result = []
  // tree.forEach((node) => {
  //   const { children, ...rest } = node
  //   result.push(rest)
  //   console.log('rest', rest)
  //   if (children && children.length) {
  //     console.log('children', children)
  //     result.push(...flattenTree(children))
  //   }
  // })
  let result = []
  for (let node of tree) {
    result.push({
      id: node.id,
      name: node.name,
      parentId: parentId
    })
    if (node.children && node.children.length) {
      result = result.concat(flattenTree(node.children, node.id))
    }
  }
  // let result = []
  // for (let node of tree) {
  //   result.push({
  //     id: node.id,
  //     name: node.name,
  //     parentId: node.parentId
  //   })
  //   if (node.children && node.children.length) {
  //     result = result.concat(flattenTree(node.children, node.parentId))
  //   }
  // }
  return result
}

// 执行拍平
const flatData1 = flattenTree(nestedDataWithMap)
console.log('flatData1', flatData1)

// var obj = {a: {b: {c: 2}}}; console.log(get(obj, 'a.b.c')); // 输出 2
// const get = (obj, path) => {
//   let keys = path.split('.')
//   let result = obj
//   for (let key of keys) {
//     if (result) {
//       result = result[key]
//     } else {
//       return undefined
//     }
//   }
//   return result
// }
var obj = { a: { b: { c: 2 } } }

console.log(get(obj, 'a.b.c')) // 输出 2

// // 做题 2 把数组平分，实现 fn
// // fn([1, 2, 3, 4, 5], 2)  //
const fn = (arr, count) => {
  let result = []
  for (let k = 0; k < arr.length; k += count) {
    result.push(arr.slice(k, k + count))
  }
  return result
}

console.log('fn', fn([1, 2, 3, 4, 5], 2))

// const data = [
//   { id: 1, parentId: null, name: '根节点' },
//   { id: 2, parentId: 1, name: '节点 1' },
//   { id: 3, parentId: 1, name: '节点 2' },
//   { id: 4, parentId: 2, name: '节点 1-1' },
//   { id: 5, parentId: 2, name: '节点 1-2' },
//   { id: 6, parentId: 3, name: '节点 2-1' }
// ]

// const buildTree = (data) => {
//   const tree = []
//   const map = new Map()
//   data.forEach(item => {
//     map.set(item.id, { ...item, children: [] })
//   })
//   data.forEach(item => {
//     let parentId = item.parentId
//     if (parentId == null) {
//       tree.push(map.get(item.id))
//     } else {
//       let parent = map.get(item.parentId)
//       parent.children.push(map.get(item.id))
//     }
//   })
//   return tree
// }
// const tree = buildTree(data)
// console.log(JSON.stringify(tree, null, 2))
// const flattenTree = (tree, parentId = null) => {
//   let flatData = []
//   for (node of tree) {
//     flatData.push({
//       id: node.id,
//       name: node.name,
//       parentId: node.parentId
//     })
//   }
//   if (node.children && node.children.length) {
//     flatData = flatData.concat(flattenTree(node.children, node.parentId))

//   }
//   return flatData
// }
// const flatData = flattenTree(tree)
// console.log('flatData', flatData)
