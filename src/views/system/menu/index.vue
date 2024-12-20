<template>
  <div class="menu-container">
    <el-card>
      <template #header>
        <el-button @click="handleCreateRootMenu">新增顶级菜单</el-button>
      </template>
      <div class="menu-tree">
        <el-tree
          :data="menus"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
          highlight-current
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          @node-drop="handleNodeDrop"
        >
          <template #default="{ data }">
            <p class="custom-item">
              <span>{{ data.title }} </span>
              <span
                ><el-button link @click="handleCreateChildMenu(data)"
                  >添加</el-button
                >
                <el-button link @click="handleRemoveMenu(data)"
                  >删除</el-button
                ></span
              >
            </p>
          </template>
        </el-tree>
      </div>
    </el-card>

    <el-card class="edit-card">
      <template #header> 编辑菜单 </template>
      <editor-menu
        v-show="editData && editData.id"
        :data="editData!"
        @updateEdit="handleUpdateEdit"
      />

      <span v-if="Object.keys(editData).length === 0"
        >从菜单列表选择一项后，进行编辑</span
      >
    </el-card>
    <el-drawer v-model="panelVisible" :title="panelTitle" :size="330">
      <add-menu @submit="submitMenuForm"></add-menu>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { MenuData } from '@/apis/menu'
import { useReloadPage } from '@/hooks/useReloadPage'
import { ITreeItemData, useMenuStore } from '@/stores/menu'
import type Node from 'element-plus/es/components/tree/src/model/node'

const handleUpdateEdit = async (data: Partial<MenuData>) => {
  // debugger
  const r = await store.updateMenu(data)
  if (r) {
    proxy?.$message.success('菜单编辑成功')
    reloadPage()
  }
}
// 拖拽节点
const allowDrag = (draggingNode: Node) => {
  return draggingNode.data.parentId !== 0 || draggingNode.data.parentId != null
}
type DropType = 'prev' | 'inner' | 'next'
const allowDrop = (draggingNode: Node, dropNode: Node, type: DropType) => {
  if (draggingNode.data.parentId === 0 || draggingNode.data.parentId == null) {
    return type !== 'inner'
  }
}
const { reloadPage } = useReloadPage()
const handleNodeDrop = () => {
  store.updateBulkMenu()
  reloadPage()
}
const store = useMenuStore()
const menus = computed(() => store.state.menuTreeData)

console.log(
  '%c [menus  ]-87',
  'font-size:13px; background:pink; color:#bf2c9f;',
  menus.value
)
store.getAllMenuList()

const defaultProps = {
  children: 'children',
  label: 'title'
}

const menuType = ref(0) // 0 顶  1 子
const panelVisible = ref(false)

const panelTitle = computed(() => {
  return menuType.value === 0 ? '添加顶级节点' : '添加子节点'
})

const handleCreateRootMenu = () => {
  menuType.value = 0
  panelVisible.value = true
}
const parentData = ref<ITreeItemData | null>()
const handleCreateChildMenu = (data: ITreeItemData) => {
  menuType.value = 1
  panelVisible.value = true
  parentData.value = data
}
const resetStatus = () => {
  panelVisible.value = false
  parentData.value = null

  reloadPage()
}

const genMenuSortId = (list: ITreeItemData[]) => {
  if (list && list.length) {
    return list[list.length - 1].sortId + 1
  }
  return 0
}

const handleAddRootMenu = async (data: MenuData) => {
  // parentId , sord_id
  data.parentId = 0
  data.sortId = genMenuSortId(menus.value) // 根节点是根据 所有的父节点来计算的， 儿子是根据爸爸有几个儿子来算的
  let res = await store.appendMenu(data)
  if (res) {
    proxy?.$message.success('根菜单添加成功了')
  }
}
const { proxy } = getCurrentInstance()!
const genChild = (data: MenuData) => {
  const parent = parentData.value!
  if (!parent.children) {
    parent.children = []
  }
  data.sortId = genMenuSortId(parent.children)
  data.parentId = parent.id
  return data
}
const handleChildRootMenu = async (data: MenuData) => {
  const child = genChild(data)
  let res = await store.appendMenu(child)
  if (res) {
    proxy?.$message.success('子菜单添加成功了')
  }
}
const submitMenuForm = async (data: MenuData) => {
  if (menuType.value === 0) {
    handleAddRootMenu({ ...data })
  } else {
    handleChildRootMenu({ ...data })
  }
  resetStatus()
}
const handleRemoveMenu = async (data: MenuData) => {
  try {
    await proxy?.$confirm('你确定删除' + data.title + '菜单吗?', {
      type: 'warning'
    })
    await store.removeMenu({
      ...data
    })
    proxy?.$message.success('菜单删除成功')
    reloadPage()
  } catch {
    proxy?.$message.info('取消菜单')
  }
}
const editData = ref({} as MenuData)
const handleNodeClick = (data: MenuData) => {
  editData.value = { ...data }
}
</script>

<style scoped>
.menu-container {
  @apply flex p-20px;
}
.menu-tree {
  @apply min-w-500px h-400px overflow-y-scroll;
}
.custom-item {
  @apply flex items-center justify-between flex-1;
}
.edit-card {
  @apply flex-1 ml-15px;
}
</style>
