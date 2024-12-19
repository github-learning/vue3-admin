import { MenuData } from '@/apis/menu'
import { ITreeItemData } from '@/stores/menu'

export type ITreeItemDataWithMenuData = ITreeItemData & {
  meta?: { icon: string; title: string; [key: string]: string }
}

export type IMap = Record<number, ITreeItemDataWithMenuData>
export const generateTree = (list: MenuData[], withMeta: boolean = false) => {
  const map = new Map()
  const tree: ITreeItemDataWithMenuData[] = []
  list.forEach((element) => {
    const node = { ...element, children: [] } as ITreeItemDataWithMenuData
    if (withMeta) {
      node.meta = {
        title: element.title,
        icon: element.icon
      }
    }
    map.set(element.id, node)
    // map.set(element.id, { ...element, children: [] })
  })

  list.forEach((item) => {
    const parentId = item.parentId
    if (parentId == null || parentId == 0) {
      // 根节点
      tree.push(map.get(item.id))
    } else {
      // 子节点，找到父级节点, 将子节点放父级节点中
      const parent = map.get(item.parentId)
      parent.children.push(map.get(item.id))
    }
  })

  return tree
}
// export const generateTree = (list: MenuData[], withMeta: boolean = false) => {
//   const map = list.reduce((memo, current) => {
//     const temp = { ...current }
//     if (withMeta) {
//       ;(temp as ITreeItemDataWithMenuData).meta = {
//         title: current.title,
//         icon: current.icon
//       }
//     }
//     memo[current.id] = temp
//     return memo
//   }, {} as IMap)
//   const tree: ITreeItemDataWithMenuData[] = []
//   list.forEach((item) => {
//     const pid = item.parent_id
//     const cur = map[item.id] // 映射表中的使用children属性的
//     if (pid !== 0 || pid != null) {
//       const parent = map[pid]
//       if (parent) {
//         const children = parent?.children || []
//         children.push(cur)
//         parent.children = children
//         return
//       }
//     }
//     tree.push(cur)
//   })

//   return tree
// }

// 0  -> 内容 parent_id
// 1 -> 内容  parent_id， chidlren[内容 parent_id]
// ....

// 5 -> 内容

// parent_id 为空的 或者 为0
