import service from './config/request'
import { Api } from './type'

export interface MenuData {
  id: number
  title: string
  path: string
  icon: string
  name: string
  sort_id: number
  parent_id: number
}

export const getAllMenus = (): Promise<Api<MenuData[]>> => {
  return service.get('/access/menu')
}

export const removeMenuById = (id: number): Promise<Api<MenuData[]>> => {
  return service.delete('/access/menu/' + id)
}

export const addMenu = (data: MenuData): Promise<Api<MenuData>> => {
  return service.post('/access/menu', data)
}

export const updateMenuById = (
  id: number,
  data: Partial<MenuData>
): Promise<Api<MenuData[]>> => {
  return service.put('/access/menu/' + id, data)
}

export const updateBulkMenu = (data: Partial<MenuData>[]): Promise<Api> => {
  return service.patch('/access/menu/update', { access: data })
}
