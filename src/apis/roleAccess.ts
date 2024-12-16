import request from './config/request'
// import { MenuData } from './menu'
import { Api } from './type'

export interface IRoleAccess {
  id: number
  accessId: number
  roleId: number
}

export type IRoleAccessList = IRoleAccess[]

// 获取角色对应权限
export const getRoleAccess = (id: number): Promise<Api<IRoleAccessList>> => {
  return request.get(`/role_access/${id}`)
}
// 给角色分配权限
export const allocRoleAccess = (id: number, data: number[]): Promise<Api> => {
  return request.post(`/role_access/${id}`, {
    access: data
  })
}

export const getRoleAccessByRoles = (roles: number[]): Promise<Api<never>> => {
  return request.post(`/role_access/role/access`, {
    roles
  })
}
