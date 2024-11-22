export function useWindowScroll() {
  const y = ref(0)

  // scrollHandler 是闭包，因为它引用了外部函数 useWindowScroll 中的 y
  const scrollHandler = () => {
    // scrollTop 是当前页面的滚动距离
    const scrollTop = document.documentElement.scrollTop
    y.value = scrollTop // 修改 y 的值
  }

  window.addEventListener('scroll', scrollHandler)

  // 组件卸载时解绑事件
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandler)
  })

  return { y }
}
