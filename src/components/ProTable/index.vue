<template>
  <!-- <div v-for="item in components" :key="item.name">
    将 props 传递给动态渲染的组件
    <component :is="item" v-bind="props" />
  </div> -->

  <!-- @reset="reset()" -->
  <SearchForm
    v-show="isShowSearch"
    :search="_search"
    :reset="_reset"
    :columns="searchColumns"
    :search-param="searchParam"
  ></SearchForm>

  <TableColumn v-bind="props" :data="processTableData"></TableColumn>
  <!-- v-loading="!processTableData || !processTableData.length" -->

  <Pagination
    v-if="pagination"
    :pageable="pageable"
    :handle-size-change="handleSizeChange"
    :handle-current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { useTable } from '@/hooks/useTable'
import TableColumn from './components/tableColumn'
import SearchForm from './components/searchForm.vue'
import Pagination from './components/Pagination.vue'

import { ColumnProps } from './model'

export interface ProTableProps {
  columns: ColumnProps[] // 列配置项  ==> 必传
  data?: any[] // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
  requestApi?: (params: any) => Promise<any> // 请求表格数据的 api ==> 非必传
  requestAuto?: boolean // 是否自动执行请求 api ==> 非必传（默认为true）
  requestError?: (params: any) => void // 表格 api 请求错误监听 ==> 非必传
  dataCallback?: (data: any) => any // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
  title?: string // 表格标题 ==> 非必传
  pagination?: boolean // 是否需要分页组件 ==> 非必传（默认为true）
  initParam?: any // 初始化请求参数 ==> 非必传（默认为{}）
  border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
  toolButton?: ('refresh' | 'setting' | 'search')[] | boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
}
// searchCol?: number | Record<BreakPoint, number> // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  requestAuto: true,
  pagination: true,
  initParam: {},
  border: true,
  toolButton: true,
  rowKey: 'id',
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
})

// 表格操作 Hooks
const {
  tableData,
  pageable,
  searchParam,
  searchInitParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange
} = useTable(
  props.requestApi,
  props.initParam,
  props.pagination,
  props.dataCallback,
  props.requestError
)

// 是否显示搜索模块
const isShowSearch = ref(true)
// 处理表格数据
const processTableData = computed(() => {
  if (!props.data) return tableData.value
  if (!props.pagination) return props.data
  return props.data.slice(
    (pageable.value.pageNum - 1) * pageable.value.pageSize,
    pageable.value.pageSize * pageable.value.pageNum
  )
})

// 处理表单字段配置

const searchColumns = computed(() =>
  props.columns
    .filter(
      (col) => !col.hideInSearch && col.dataIndex && col.dataIndex !== 'adction'
    ) // 仅保留有表单类型的字段
    .map(
      ({
        dataIndex,
        label,
        valueType,
        valueEnum,
        defaultValue,
        dateOptions
      }) => ({
        label,
        dataIndex,
        valueType,
        valueEnum,
        defaultValue,
        dateOptions
      })
    )
)

console.log(
  '%c [  ]-116',
  'font-size:13px; background:pink; color:#bf2c9f;',
  searchColumns.value
)

// 过滤需要搜索的配置项 && 排序
// const searchColumns = computed(() => {
//   return flatColumns.value
//     ?.filter(item => item.search?.el || item.search?.render)
//     .sort((a, b) => a.search!.order! - b.search!.order!);
// });

// // 设置 搜索表单默认排序 && 搜索表单项的默认值
// searchColumns.value?.forEach((column, index) => {
//   column.search!.order = column.search?.order ?? index + 2;
//   const key = column.search?.key ?? handleProp(column.prop!);
//   const defaultValue = column.search?.defaultValue;
//   if (defaultValue !== undefined && defaultValue !== null) {
//     searchParam.value[key] = defaultValue;
//     searchInitParam.value[key] = defaultValue;
//   }
// });

const _reset = () => {
  reset()
}
const _search = () => {
  search()
}

// 初始化表格数据 && 拖拽排序
onMounted(() => {
  props.requestAuto && getTableList()
  props.data && (pageable.value.total = props.data.length)
})
console.log('props', props)

// 暴露给父组件的参数和方法 (外部需要什么，都可以从这里暴露出去)
defineExpose({
  tableData: processTableData,
  pageable,
  searchParam,
  searchInitParam,

  // 下面为 function
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange
})
</script>

<style lang="scss" scoped></style>
