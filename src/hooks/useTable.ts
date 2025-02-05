import { reactive, computed, toRefs } from 'vue'
import { useGlobalDialog } from '@/hooks/globalDialog'
/**
 *
 * @description table 页面操作方法封 装
 * @param {Function} api 获取表格数据 api 方法 (必传)
 * @param {Object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页 (非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 * */

interface State {
  tableData: unknown[]
  pageable: {
    pageNum: number
    pageSize: number
    total: number
  }
  searchParam: Record<string, unknown> // 定义 searchParam 为任意键值对对象
  searchInitParam: Record<string, unknown>
  totalParam: Record<string, unknown>
}

interface ApiResponse {
  data: unknown // 根据实际情况修改类型
  [key: string]: unknown
}

export const useTable = (
  api?: (params: unknown) => Promise<ApiResponse>,
  initParam: object = {},
  isPageable: boolean = true,
  dataCallBack?: (data: unknown) => unknown,
  requestError?: (error: unknown) => void
) => {
  const state: State = reactive({
    // 表格数据
    tableData: [],
    // 分页数据
    pageable: {
      // 当前页数
      pageNum: 1,
      // 每页显示条数
      pageSize: 10,
      // 总条数
      total: 0
    },
    // 查询参数(只包括查询)
    searchParam: {},
    // 初始化默认的查询参数
    searchInitParam: {},
    // 总参数(包含分页和查询参数)
    totalParam: {}
  })

  /**
   * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
   * */
  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pageable.pageNum,
        pageSize: state.pageable.pageSize
      }
    },
    //   pageNum?: number
    // pageSize?: number
    set: (newVal: unknown) => {
      console.log('我是分页更新之后的值', newVal)
    }
  })

  /**
   * @description 获取表格数据
   * @return void
   * */
  const getTableList = async () => {
    console.log('我是获取表格数据的方法', state)
    console.log('api', api)
    console.log('pageParam', pageParam.value)
    if (!api) return
    console.log('111')
    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(
        state.totalParam,
        initParam,
        isPageable ? pageParam.value : {}
      )

      let { data } = await api({
        ...state.searchInitParam,
        ...state.totalParam
      })
      console.log('data', data)
      setTimeout(() => {
        dataCallBack && (data = dataCallBack(data))
        state.tableData = isPageable ? data.list : data
      }, 1000)

      // 解构后台返回的分页数据 (如果有分页更新分页信息)
      if (isPageable) {
        state.pageable.total = data.total
      }
    } catch (error) {
      requestError && requestError(error)
    }
  }

  // /**
  //  * @description 更新查询参数
  //  * @return void
  //  * */
  const updatedTotalParam = () => {
    state.totalParam = {}
    // 处理查询参数，可以给查询参数加自定义前缀操作
    const nowSearchParam: Record<string, any> = {}
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）

    console.log(
      '%c [  ]-100',
      'font-size:13px; background:pink; color:#bf2c9f;',
      state.searchParam
    )
    for (const key in state.searchParam) {
      // 某些情况下参数为 false/0 也应该携带参数
      if (
        state.searchParam[key] ||
        state.searchParam[key] === false ||
        state.searchParam[key] === 0
      ) {
        nowSearchParam[key] = state.searchParam[key]
      }
    }
    Object.assign(state.totalParam, nowSearchParam)
  }

  /**
   * @description 表格数据查询
   * @return void
   * */
  const search = () => {
    state.pageable.pageNum = 1

    console.log(
      '%c [  ]-125',
      'font-size:13px; background:pink; color:#bf2c9f;',
      11
    )
    updatedTotalParam()
    getTableList()
  }

  /**
   * @description 表格数据重置
   * @return void
   * */
  const reset = () => {
    console.log(
      '%c [  ]-158',
      'font-size:13px; background:pink; color:#bf2c9f;',
      111
    )
    useGlobalDialog(() => {
      console.log(
        '%c [  ]-164',
        'font-size:13px; background:pink; color:#bf2c9f;',
        111
      )
      state.pageable.pageNum = 1
      // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
      state.searchParam = { ...state.searchInitParam }
      // updatedTotalParam()
      getTableList()
    })
  }

  /**
   * @description 每页条数改变
   * @param {Number} val 当前条数
   * @return void
   * */
  const handleSizeChange = (val: number) => {
    console.log(
      '%c [  ]-131',
      'font-size:13px; background:pink; color:#bf2c9f;',
      val
    )
    state.pageable.pageNum = 1
    state.pageable.pageSize = val
    getTableList()
  }

  /**
   * @description 当前页改变
   * @param {Number} val 当前页
   * @return void
   * */
  const handleCurrentChange = (val: number) => {
    console.log(
      '%c [  ]-131',
      'font-size:13px; background:pink; color:#bf2c9f;',
      val
    )
    state.pageable.pageNum = val
    getTableList()
  }

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange
    // updatedTotalParam
  }
}
