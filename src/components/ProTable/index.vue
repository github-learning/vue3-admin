<template>
  <div>
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

    <el-table
      :data="data"
      :loading="loading"
      border
      style="width: 100%"
      v-bind="$attrs"
    >
      <el-table-column
        v-for="column in tableColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
      >
        <template #default="scope">
          <!-- 优先处理 render 函数 -->
          <div v-if="column.render">
            22
            {{ column.render(_, scope.row) }}
          </div>

          <!-- 默认显示 -->
          <span v-else>
            {{ scope.row[column.prop] }}
          </span>
        </template>
        <!-- 优先处理插槽 -->
        <!-- <template v-if="column.slot" #default="scope">
          <slot :name="column.slot" :scope="scope" />
        </template> -->

        <!-- 支持 render 函数 -->
        <!-- <template v-else-if="column.render" #default="scope">
          <component :is="column.render" :scope="scope" />
        </template> -->
      </el-table-column>
    </el-table>

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
