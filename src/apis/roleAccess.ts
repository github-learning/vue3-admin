import service from './config/request'
// import { MenuData } from './menu'
import { Api } from './type'

export interface IRoleAccess {
  id: number
  access_id: number
  role_id: number
}

export type IRoleAccessList = IRoleAccess[]

// 获取角色对应权限
export const getRoleAccess = (id: number): Promise<Api<IRoleAccessList>> => {
  return service.get(`/role_access/${id}`)
}
// 给角色分配权限
export const allocRoleAccess = (id: number, data: number[]): Promise<Api> => {
  return service.post(`/role_access/${id}`, {
    access: data
  })
}

export const getRoleAccessByRoles = (roles: number[]): Promise<Api<never>> => {
  return service.post(`/role_access/role/access`, {
    roles
  })
}