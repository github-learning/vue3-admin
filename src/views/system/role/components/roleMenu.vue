<template>
  <el-dialog v-model="dialogVisible">
    <el-tree
      :data="treeData"
      show-checkbox
      :props="defaultProps"
      :default-expand-all="true"
      highlight-current
      ref="menuTree"
      node-key="id"
      :check-strictly="checkStrictly"
    ></el-tree>

    <template #footer>
      <el-button type="primary" @click="handleCheckAll">全部选择</el-button>
      <el-button type="warning" @click="handleSubmit">确认分配</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { IRole } from '@/api/role'
import { useMenuStore } from '@/stores/menu'
import { PropType } from 'vue'
import { ElTree } from 'element-plus'
import Node from 'element-plus/es/components/tree/src/model/node.mjs'
import { allocRoleAccess, getRoleAccess } from '@/api/roleAccess'
import { useReloadPage } from '@/hooks/useReloadPage'

const checkStrictly = ref(false)
const { reloadPage } = useReloadPage()
const store = useMenuStore()
const treeData = computed(() => store.state.menuTreeData) // 所有的菜单
onMounted(() => {
  store.getAllMenuList()
})
const defaultProps = {
  children: 'children',
  label: 'title'
}
type ElTreeInstance = InstanceType<typeof ElTree>
const menuTree = ref<ElTreeInstance | null>(null)

const isCheckAll = ref(false)
const handleCheckAll = () => {
  if (!isCheckAll.value) {
    menuTree.value?.setCheckedNodes(treeData.value as unknown as Node[], false)
  } else {
    menuTree.value?.setCheckedNodes([], false)
  }
  isCheckAll.value = !isCheckAll.value
}
const { proxy } = getCurrentInstance()!
const handleSubmit = async () => {
  const tree = menuTree.value!
  const keys = tree.getCheckedKeys(false) // 所有选中的节点
  const halfKeys = tree.getHalfCheckedKeys()
  const selectKeys = [...keys, ...halfKeys]

  const res = await allocRoleAccess(role.id, selectKeys as number[])
  if (res.code === 0) {
    proxy?.$message.success('权限分配成功')
    reloadPage()
  }
}

const { role, modelValue } = defineProps({
  role: {
    type: Object as PropType<IRole>,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})
const dialogVisible = ref(modelValue)
const emit = defineEmits(['update:modelValue'])

watch(
  () => dialogVisible.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)
const getRoleAccessList = async () => {
  checkStrictly.value = true // 先解除关系
  const res = await getRoleAccess(role.id)
  if (res.code === 0) {
    const access = res.data.map((item) => item.access_id)
    menuTree.value?.setCheckedKeys(access)
    setTimeout(() => {
      checkStrictly.value = false
    }, 0)
  }
  //
}

onMounted(() => {
  console.log('----')
  getRoleAccessList()
})
</script>
