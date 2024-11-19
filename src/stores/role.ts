import { IRole, IRoleParams, IRoleState } from '@/apis/role'

import {
  getRoles as getRolesApi,
  addRole as addRoleApi,
  updateRole as updateRoleApi,
  removeRole as removeRoleApi
} from '@/apis/role'
type WithRoleParmas = IRole & IRoleParams
export const useRoleStore = defineStore('role', () => {
  const state = reactive<IRoleState>({
    roles: [],
    total: 0
  })

  const getRoles = async (params: IRoleParams) => {
    const {
      data: { roles, total }
    } = await getRolesApi(params)
    state.roles = roles
    state.total = total
  }

  const addRole = async (data: WithRoleParmas) => {
    // console.log('obj', data)
    const { pageNum, pageSize, ...obj } = data

    console.log(
      '%c [  ]-28',
      'font-size:13px; background:pink; color:#bf2c9f;',
      obj
    )
    const res = await addRoleApi(obj)
    if (res.code === 200) {
      getRoles({ pageNum, pageSize })
    }
  }
  const updateRole = async (data: WithRoleParmas) => {
    const { pageNum, pageSize, ...obj } = data
    const res = await updateRoleApi(obj.id, obj)
    if (res.code === 200) {
      getRoles({ pageNum, pageSize })
    }
  }

  const removeRole = async (data: WithRoleParmas) => {
    const { pageNum, pageSize, id } = data
    const res = await removeRoleApi(id)
    if (res.code === 200) {
      getRoles({ pageNum, pageSize })
    }
  }

  return { getRoles, addRole, updateRole, removeRole, state }
})
