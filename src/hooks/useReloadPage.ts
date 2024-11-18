export const useReloadPage = () => {
  const { proxy } = getCurrentInstance()!
  const reloadPage = async ({ title = '确认刷新', message = '确认' } = {}) => {
    try {
      await proxy?.$confirm(title, message)
      window.location.reload()
    } catch {
      proxy?.$message.warning('取消刷新')
    }
  }
  return { reloadPage }
}
