import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.example.com'
})

// 请求拦截器：携带 Access Token
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器：处理 Token 过期
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 检查是否为 Access Token 过期错误
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        try {
          // 请求新 Access Token
          const response = await axios.post(
            'https://api.example.com/refresh-token',
            { token: refreshToken }
          )
          const newAccessToken = response.data.accessToken

          // 更新存储的 Access Token
          localStorage.setItem('accessToken', newAccessToken)

          // 重试原请求
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return apiClient(originalRequest)
        } catch (refreshError) {
          console.error('Refresh Token expired or invalid.', refreshError)
          // 引导用户重新登录
          window.location.href = '/login'
        }
      } else {
        // 没有 Refresh Token，跳转登录页
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
