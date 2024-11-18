import service from '@/apis/config/request'
import { Api } from './type'

export interface IRole {
  id: number
  name: string
  description: string
  is_default: number
}

export interface IRoleState {
  roles: IRole[]
  total: number
}
export interface IRoleParams {
  pageNum: number
  pageSize: number
}

// 获取用户
export const getRoles = (
  params = { pageNum: 1, pageSize: 10 }
): Promise<Api<IRoleState>> => {
  return service.get('/role', {
    params
  })
}

// 添加用户
export const addRole = (data: IRole): Promise<Api> => {
  return service.post('/role', {
    data
  })
}

// 更新用户: Partial部分参数
export const updateRole = (id: number, data: Partial<IRole>): Promise<Api> => {
  return service.put('/role/' + id, {
    data
  })
}

// 删除用户
export const removeRole = (id: number): Promise<Api> => {
  return service.delete('/role/' + id)
}
