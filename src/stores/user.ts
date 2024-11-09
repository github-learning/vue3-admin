export const useUserStore = defineStore('user', () => {
  const state = reactive({
    token: '',
    age: ''
  })
  const logout = () => {
    state.token = ''
  }

  return {
    state,
    logout
  }
})
