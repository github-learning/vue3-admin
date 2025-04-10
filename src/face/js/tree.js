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
