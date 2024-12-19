<script lang="ts">
export default {
  setup() {
    const route = useRoute()

    const router = useRouter()
    // 只是为了实现重定向功能
    router.replace({
      path: '/' + route.params.path,
      query: route.query
    })
  },

  render() {
    return h('template')
  }
}
</script>
