import type { IUserLoginData, IUserQuery, IUsers, Profile } from '@/apis/user'
import {
  login as loginApi,
  getUsers as getUsersApi, // 获取用户
  addUser as addUserApi,
  removeUser as removeUserApi,
  updateUser as updateUserApi,
  getUserInfo as getUserInfoApi
} from '@/apis/user'
import { setToken, removeToken } from '@/utils/auth'
// import { useTagsView } from './tagsView'
import { IRole } from '@/apis/role'
export type IProfileQuery = Profile & {
  pageNum?: number
  pageSize?: number
}
export const useUserStore = defineStore(
  'user',
  () => {
    const state = reactive({
      token: '',
      users: [] as IUsers['list'], // 用户列表
      total: 0, // 用户个数
      roles: [] as IRole[],
      userInfo: {} as Profile,
      roleIds: [] as number[]
    })

    // const tagsViewStore = useTagsView()
    const getUserInfo = async () => {
      const res = await getUserInfoApi()
      if (res.code === 200) {
        const { roleIds, ...info } = res.data

        state.roleIds = roleIds || []
        state.userInfo = info as Profile
      }
    }

    const login = async (userInfo: IUserLoginData) => {
      try {
        const { username, password } = userInfo
        const response = await loginApi({ username: username.trim(), password })
        const { data } = response
        state.token = data.token
        setToken(data.token)
      } catch (e) {
        return Promise.reject(e)
      }
    }
    const logout = () => {
      state.token = ''
      removeToken()
      // 所有的信息都应该情况
      // tagsViewStore.delAllView() // ...
    }

    // 获取全部用户
    const getAllUsers = async (params: IUserQuery) => {
      const { data } = await getUsersApi(params)

      state.users = data.list
      state.total = data.total
    }

    // 添加用户
    const addUser = async (data: IProfileQuery) => {
      const { pageSize, pageNum, ...params } = data
      const res = await addUserApi(params)
      if (res.code === 200) {
        getAllUsers({
          pageSize,
          pageNum
        })
      }
    }
    // 删除用户
    const removeUser = async (data: IProfileQuery) => {
      const { pageSize, pageNum, id } = data
      const res = await removeUserApi(id)
      if (res.code === 200) {
        getAllUsers({
          pageSize,
          pageNum
        })
      }
    }

    const editUser = async (data: IProfileQuery) => {
      const { pageSize, pageNum, ...params } = data

      const res = await updateUserApi(params.id, params)
      if (res.code === 200) {
        getAllUsers({
          pageSize,
          pageNum
        })
      }
    }
    return {
      login,
      state,
      logout,
      getAllUsers,
      editUser,
      removeUser,
      addUser,
      getUserInfo
    }
  },
  {
    persist: true
  }
)
