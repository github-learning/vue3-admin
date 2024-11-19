import { useUserStore } from '@/stores'

const checkPermission = (el: HTMLElement, bindings: DirectiveBinding) => {
  const { value } = bindings
  const store = useUserStore()
  const roles = computed(() => store.state.roles.map((role) => role.name))
  if (value && Array.isArray(value)) {
    const hasPermission = roles.value.some((item) => value.includes(item))
    if (!hasPermission) {
      el.parentNode?.removeChild(el)
    }
  } else {
    throw new Error('请提供权限')
  }
}
const permission = (el: HTMLElement, bindings: DirectiveBinding) => {
  checkPermission(el, bindings)
}
export default permission
