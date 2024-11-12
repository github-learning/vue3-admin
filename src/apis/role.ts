import request from '@/apis/config/request'

export interface IRole {
  id: number
  name: string
  description: string
  is_default: number
}

export interface IRoleState {
  roles: IRole[]
  count: number
}
export interface IRoleParams {
  pageNum: number
  pageSize: number
}

// 获取用户
export const getRoles = (params = { pageNum: 0, pageSize: 10 }) => {
  return request.get('/role', {
    params
  })
}

// 添加用户
export const addRole = (data: IRole) => {
  return request.post('/role', {
    data
  })
}

// 更新用户: Partial部分参数
export const updateRole = (id: number, data: Partial<IRole>) => {
  return request.put('/role/' + id, {
    data
  })
}

// 删除用户
export const removeRole = (id: number) => {
  return request.delete('/role/' + id)
}
