import { MenuData } from '@/apis/menu'
import { ITreeItemData } from '@/stores/menu'

export type ITreeItemDataWithMenuData = ITreeItemData & {
  meta?: { icon: string; title: string; [key: string]: string }
}

export type IMap = Record<number, ITreeItemDataWithMenuData>
export const generateTree = (list: MenuData[], withMeta: boolean = false) => {
  const map = list.reduce((memo, current) => {
    const temp = { ...current }
    if (withMeta) {
      ;(temp as ITreeItemDataWithMenuData).meta = {
        title: current.title,
        icon: current.icon
      }
    }
    memo[current.id] = temp
    return memo
  }, {} as IMap)
  const tree: ITreeItemDataWithMenuData[] = []
  list.forEach((item) => {
    const pid = item.parent_id
    const cur = map[item.id] // 映射表中的使用children属性的
    if (pid !== 0 || pid != null) {
      const parent = map[pid]
      if (parent) {
        const children = parent?.children || []
        children.push(cur)
        parent.children = children
        return
      }
    }
    tree.push(cur)
  })
  return tree
}

// 0  -> 内容 parent_id
// 1 -> 内容  parent_id， chidlren[内容 parent_id]
// ....

// 5 -> 内容

// parent_id 为空的 或者 为0
