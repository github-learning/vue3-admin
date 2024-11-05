export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0)
    const minCount = ref(0)
    const obj = reactive({
      index: 0
    })

    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
      minCount.value++
      obj.index++
    }

    return { count, minCount, obj, doubleCount, increment }
  },

  {
    persist: true
    // persist: {
    //   pick: ['count', 'minCount'],
    //   storage: sessionStorage
    // }
  }
)
