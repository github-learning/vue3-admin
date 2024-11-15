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
    count: 0
  })

  const getRoles = async (params: IRoleParams) => {
    const res = await getRolesApi(params)
    const { data } = res
    state.roles = data.roles
    state.count = data.count
  }

  const addRole = async (data: WithRoleParmas) => {
    const { pageNum, pageSize, ...obj } = data
    const res = await addRoleApi(obj)
    if (res.code == 0) {
      getRoles({ pageNum, pageSize })
    }
  }
  const updateRole = async (data: WithRoleParmas) => {
    const { pageNum, pageSize, ...obj } = data
    const res = await updateRoleApi(obj.id, obj)
    if (res.code == 0) {
      getRoles({ pageNum, pageSize })
    }
  }

  const removeRole = async (data: WithRoleParmas) => {
    const { pageNum, pageSize, id } = data
    const res = await removeRoleApi(id)
    if (res.code == 0) {
      getRoles({ pageNum, pageSize })
    }
  }

  return { getRoles, addRole, updateRole, removeRole, state }
})
