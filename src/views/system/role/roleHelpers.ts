import { IRole } from '@/apis/role'
import { useRoleStore } from '@/stores/role'
export const useRoleHelpers = ({
  pageSize,
  pageNum
}: {
  pageSize: Ref<number>
  pageNum: Ref<number>
}) => {
  const { proxy } = getCurrentInstance()!
  const editType = ref(-1)
  const visible = ref(false)
  const editData = ref<IRole | undefined>(undefined)
  const store = useRoleStore()
  const panelTitle = computed(() =>
    editType.value == 1 ? '增加角色' : '修改角色'
  ) //  添加还是修改
  const handleEditRole = (role: IRole) => {
    editType.value = 0
    editData.value = { ...role }
    visible.value = true
  }
  const hanleAddRole = () => {
    editType.value = 1
    editData.value = {} as IRole
    visible.value = true
  }
  const addNewRole = async (data: IRole) => {
    await store.addRole({
      ...data,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
    proxy?.$message.success('角色添加成功')
    visible.value = false
  }
  const editRow = async (data: IRole) => {
    await store.updateRole({
      ...data,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
    proxy?.$message.success('角色编辑成功')
    visible.value = false
  }
  const handleSubmit = async (data: IRole) => {
    if (editType.value === 1) {
      await addNewRole(data)
    } else {
      await editRow(data)
    }
  }
  const handleRemove = async (data: IRole) => {
    try {
      await proxy?.$confirm('你确定删除' + data.name + '角色吗?', {
        type: 'warning'
      })
      await store.removeRole({
        ...data,
        pageNum: pageNum.value,
        pageSize: pageSize.value
      })
      proxy?.$message.success('角色删除成功')
    } catch {
      proxy?.$message.info('取消删除')
    }
  }
  return {
    handleSubmit,
    handleRemove,
    handleEditRole,
    hanleAddRole,
    panelTitle,
    editType,
    visible,
    editData
  }
}
