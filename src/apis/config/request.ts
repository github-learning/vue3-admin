import { useUserStore } from '@/stores'
import { getToken } from '@/utils'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const config = {
  // baseURL: 'http://127.0.0.1',
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 3000
}
console.log('import.meta.env.VITE_BASE_API', import.meta.env.VITE_BASE_API)
const service = axios.create(config)
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (response) => {
    // code
    const { code, message } = response.data
    if (code !== 200) {
      ElMessage.error(message)
      return Promise.reject(message)
    }
    return response.data
  },
  (err) => {
    const store = useUserStore()
    const res = err.response
    if (res.status === 401) {
      // 说明token不正确，
      store.logout() // 移除token
      window.location.reload()
    }
    return Promise.reject(err)
  }
)
export default service
