import request from './config/request'
import { Api } from './type'

export interface MenuData {
  id: number
  title: string
  path: string
  icon: string
  name: string
  sortId: number
  parentId: number
}

export const getAllMenus = (): Promise<Api<MenuData[]>> => {
  return request.get('/menu')
}

export const removeMenuById = (id: number): Promise<Api<MenuData[]>> => {
  return request.delete('/menu/' + id)
}

export const addMenu = (data: MenuData): Promise<Api<MenuData>> => {
  return request.post('/menu', data)
}
/**
 * 单个修改
 * @param id
 * @param data
 * @returns
 */
export const updateMenuById = (
  id: number,
  data: Partial<MenuData>
): Promise<Api<MenuData[]>> => {
  return request.put('/menu/' + id, data)
}
/**
 * 批量修复 patch
 * @param data
 * @returns
 */
export const updateBulkMenu = (data: Partial<MenuData>[]): Promise<Api> => {
  return request.patch('/menu', { access: data })
}
