// 扁平化数据
const data = [
  { id: 1, parentId: null, name: '根节点' },
  { id: 2, parentId: 1, name: '节点 1' },
  { id: 3, parentId: 1, name: '节点 2' },
  { id: 4, parentId: 2, name: '节点 1-1' },
  { id: 5, parentId: 2, name: '节点 1-2' },
  { id: 6, parentId: 3, name: '节点 2-1' }
]

const buildTree = (data) => {
  const map = new Map()
  const tree = []
  data.forEach((element) => {
    map.set(element.id, { ...element, children: [] })
  })

  data.forEach((item) => {
    let parentId = item.parentId
    if (parentId === null) {
      // 根节点
      tree.push(map.get(item.id))
    } else {
      // 子节点，找到根节点, 将子节点放入根节点中
      const parent = map.get(item.parentId)

      parent.children.push(map.get(item.id))
    }
  })
  return tree
}
// 构建树结构
const tree = buildTree(data)
console.log(JSON.stringify(tree, null, 2))

// const flattenTree = (tree, parentId = null) => {
//   let flatData = []
//   for (let node of tree) {
//     flatData.push({
//       id: node.id,
//       name: node.name,
//       parentId: parentId
//     })
//     if (node.children && node.children.length) {
//       flatData = flatData.concat(flattenTree(node.children, node.id))
//     }
//   }
//   return flatData
// }
// // 示例树
// const tree1 = [
//   {
//     id: 1,
//     name: 'A',
//     children: [
//       {
//         id: 2,
//         name: 'B',
//         children: [
//           { id: 4, name: 'D', children: [] },
//           { id: 5, name: 'E', children: [] }
//         ]
//       },
//       {
//         id: 3,
//         name: 'C',
//         children: [{ id: 6, name: 'F', children: [] }]
//       }
//     ]
//   }
// ]

// // 扁平化数据
// const flatData = flattenTree(tree1)
// console.log('flatData', flatData)
