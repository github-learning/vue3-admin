export const useReloadPage = ()=>{
  const {proxy} = getCurrentInstance()!
  const reloadPage = async ({title= '是否刷新', message= '确定'}={})=>{
    try {
           await proxy.$confirm(title, message)
    window.location.reload()
    } catch (error) {
       proxy?.$message.warning("已经取消了刷新")
    }
  }
  return reloadPage
  
}
