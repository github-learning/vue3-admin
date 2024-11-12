import { LocationQuery } from 'vue-router'

export const useRouteQuery = () => {
  const redirect = ref('')
  const otherQuery = ref<LocationQuery>()
  const route = useRoute()
  const getOtherQuery = (query: LocationQuery) => {
    return Object.keys(query).reduce((memo, key) => {
      if (key !== 'redirect') {
        memo[key] = query[key]
      }
      return memo
    }, {} as LocationQuery)
  }

  watchEffect(() => {
    const query = route.query
    if (query) {
      redirect.value = query.redirect as string
      otherQuery.value = getOtherQuery(query)
    }
  })

  return {
    redirect,
    otherQuery
  }
}
