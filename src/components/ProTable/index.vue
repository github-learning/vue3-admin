<template>
  <div>
    <!-- 查询表单 -->
    <el-form
      :model="form"
      ref="queryForm"
      label-width="100px"
      class="form-container"
    >
      <el-row :gutter="20">
        <el-col v-for="field in queryFields" :key="field.prop" :span="6">
          <el-form-item :label="field.label" :prop="field.prop">
            <component
              :is="field.component"
              v-model="form[field.prop]"
              v-bind="field.props"
            ></component>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格 -->

    <el-table
      :data="data"
      :loading="loading"
      border
      style="width: 100%"
      @sort-change="handleSortChange"
    >
      <el-table-column
        v-for="column in tableColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable"
        :width="column.width"
      >
        <!-- <template #default="scope">
          <component :is="column.render" :scope="scope" />
        </template> -->
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="pagination.total > 0"
      style="margin-top: 20px; text-align: right"
      background
      layout="prev, pager, next, jumper, ->, total"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @current-change="handlePageChange"
      @size-change="handlePageSizeChange"
    ></el-pagination>
  </div>
</template>

<script setup>
defineProps({
  queryFields: {
    type: Array,
    default: () => []
  },
  tableColumns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  }
})

const form = reactive({})

const loading = ref(false)
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const handleQuery = async () => {
  pagination.currentPage = 1 // 重置到第一页
  await fetchTableData()
}

const handleReset = () => {
  Object.keys(form).forEach((key) => (form[key] = ''))
  handleQuery()
}

const handleSortChange = ({ prop, order }) => {
  console.log('排序字段:', prop, '排序顺序:', order)
  fetchTableData()
}

const handlePageChange = async (page) => {
  pagination.currentPage = page
  await fetchTableData()
}

const handlePageSizeChange = async (size) => {
  pagination.pageSize = size
  await fetchTableData()
}

const fetchTableData = async () => {
  // loading.value = true
  // const { data, total } = await props.fetchData({
  //   ...form,
  //   page: pagination.currentPage,
  //   pageSize: pagination.pageSize
  // })
  // tableData.value = data
  // console.log(
  //   '%c [  ]-123',
  //   'font-size:13px; background:pink; color:#bf2c9f;',
  //   tableData.value
  // )
  // pagination.total = total
  // loading.value = false
}

watch(() => [pagination.currentPage, pagination.pageSize], fetchTableData)
</script>

<style scoped>
.form-container {
  margin-bottom: 20px;
  background: #fff;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
