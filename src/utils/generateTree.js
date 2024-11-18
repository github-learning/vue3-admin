// 扁平化数据
const data = [
  { id: 1, parentId: null, name: '根节点' },
  { id: 2, parentId: 1, name: '节点 1' },
  { id: 3, parentId: 1, name: '节点 2' },
  { id: 4, parentId: 2, name: '节点 1-1' },
  { id: 5, parentId: 2, name: '节点 1-2' },
  { id: 6, parentId: 3, name: '节点 2-1' }
]
export const buildTree = (data) => {
  const map = new Map()
  const tree = []
  data.forEach((item) => {
    map.set(item.id, { ...item, children: [] })
  })
  data.forEach((item) => {
    const parent = item.parentId
    if (parent == null || parent === 0) {
      tree.push(map.get(item.id))
    } else {
      const parentItem = map.get(item.parentId)
      if (!parentItem.children) {
        parentItem.children = []
      }
      parentItem.children.push(map.get(item.id))
    }
  })
  return tree
}

console.log('buildTree', JSON.stringify(buildTree(data), null, 2))

// 示例树
const tree = [
  {
    id: 1,
    name: 'A',
    children: [
      {
        id: 2,
        name: 'B',
        children: [
          { id: 4, name: 'D', children: [] },
          { id: 5, name: 'E', children: [] }
        ]
      },
      {
        id: 3,
        name: 'C',
        children: [{ id: 6, name: 'F', children: [] }]
      }
    ]
  }
]

const flattenTree = (tree, parentId = null) => {
  let flatData = []
  for (let node of tree) {
    flatData.push({
      id: node.id,
      name: node.name,
      parentId
    })
    if (node.children && node.children.length) {
      flatData = flatData.concat(flattenTree(node.children, node.id))
    }
  }
  return flatData
}

// 扁平化数据
const flatData = flattenTree(tree)
console.log('flatData', JSON.stringify(flatData, null, 2))
