import {
  getAllMenus,
  MenuData,
  addMenu,
  removeMenuById,
  updateMenuById,
  updateBulkMenu as updateBulkMenuApi
} from '@/apis/menu'
import { getRoleAccessByRoles } from '@/apis/roleAccess'
import { generateTree, ITreeItemDataWithMenuData } from '@/utils/generateTree'
export interface ITreeItemData extends MenuData {
  children?: ITreeItemData[]
}
export interface IMenuState {
  menuList: Array<MenuData>
  menuTreeData: ITreeItemData[]
  authMenuList: MenuData[]
  authMenuTreeData: ITreeItemDataWithMenuData[]
}

export const useMenuStore = defineStore('menu', () => {
  const state = reactive<IMenuState>({
    menuList: [],
    menuTreeData: [],
    authMenuList: [], // 侧边菜单需要的
    authMenuTreeData: []
  })
  const getAllMenuList = async () => {
    const res = await getAllMenus()
    if (res.code === 200) {
      const { data } = res
      state.menuList = data
      state.menuTreeData = generateTree(data)
    }
  }

  const appendMenu = async (data: ITreeItemData) => {
    const res = await addMenu(data)
    if (res.code === 200) {
      const node = { ...res.data }
      state.menuList.push(node)
      state.menuTreeData = generateTree(state.menuList)

      return true
    }
  }

  const removeMenu = async (data: ITreeItemData) => {
    const res = await removeMenuById(data.id)
    if (res.code === 200) {
      const idx = state.menuList.findIndex((menu) => menu.id === data.id)
      state.menuList.splice(idx, 1)
      state.menuTreeData = generateTree(state.menuList)
      return true
    }
  }

  const updateBulkMenu = async () => {
    // 1.更新sortId
    state.menuTreeData.forEach((menu, idx) => (menu.sortId = idx))
    // 2.删除子节点
    const menus = state.menuTreeData.map((menu) => {
      const temp = { ...menu }
      delete temp.children
      return temp
    })
    // 批量更新
    const res = await updateBulkMenuApi(menus)
    if (res.code == 200) {
      return true
    }
  }
  const updateMenu = async (data: Partial<MenuData>) => {
    const res = await updateMenuById(Number(data.id), data)
    if (res.code === 200) {
      await getAllMenuList()
      return true
    }
  }

  const getAllMenuListByAdmin = async () => {
    const res = await getAllMenus()
    if (res.code == 200) {
      const { data } = res
      state.authMenuList = data
      state.authMenuTreeData = generateTree(data, true)
    }
  }

  const getMenuListByRoles = async (roles: number[]) => {
    const res = await getRoleAccessByRoles(roles)
    if (res.code == 200) {
      const { data } = res
      const access = data.access
      state.authMenuList = access
      state.authMenuTreeData = generateTree(access, true)
    }
  }

  return {
    getAllMenuList,
    state,
    appendMenu,
    removeMenu,
    updateBulkMenu,
    updateMenu,
    getAllMenuListByAdmin,
    getMenuListByRoles
  }
})
