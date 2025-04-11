const flatData = [
  { id: 1, name: '根节点', parentId: null },
  { id: 2, name: '子节点1', parentId: 1 },
  { id: 3, name: '子节点2', parentId: 1 },
  { id: 4, name: '子节点1-1', parentId: 2 },
  { id: 5, name: '子节点1-2', parentId: 2 },
  { id: 6, name: '子节点2-1', parentId: 3 }
]
const buildTree = (flatData) => {
  const map = new Map()
  const tree = []
  flatData.forEach((el) => {
    map.set(el.id, { ...el, children: [] })
  })
  flatData.forEach((el) => {
    const parentId = el.parentId
    if (parentId === null) {
      tree.push(map.get(el.id))
    } else {
      const parent = map.get(el.parentId)
      parent.children.push(map.get(el.id))
    }
  })
  return tree
}
const tree = buildTree(flatData)
console.log(JSON.stringify(tree, null, 2))
const flattenTree = (tree, parentId = null) => {
  let result = []
  for (const node of tree) {
    result.push({
      id: node.id,
      name: node.name,
      parentId: parentId
    })
    if (node.children && node.children.length) {
      result = result.concat(flattenTree(node.children, node.id))
    }
  }
  return result
}

console.log(
  '%c [  ]-42',
  'font-size:13px; background:pink; color:#bf2c9f;',
  flattenTree(tree)
)
// const buildTree = (arr) => {
//   const map = new Map()
//   const tree = []
//   arr.forEach((el) => {
//     map.set(el.id, { ...el, children: [] })
//   })
//   arr.forEach((el) => {
//     const parentId = el.parentId
//     if (parentId === null) {
//       tree.push(map.get(el.id))
//     } else {
//       const parent = map.get(parentId)
//       parent.children.push(map.get(el.id))
//     }
//   })
//   return tree
// }
// const tree = buildTree(flatData)
// console.log(JSON.stringify(tree, null, 2))
