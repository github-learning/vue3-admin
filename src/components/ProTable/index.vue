<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tableColumns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <el-table :data="props.data" border style="width: 100%">
    {props.tableColumns.map((column) => (
    <el-table-column
      key="{column.prop}"
      prop="{column.prop}"
      label="{column.label}"
      width="{column.width}"
    >
      {column.render ? (scope) => { const { row } = scope; return
      column.render(row); } : null}
    </el-table-column>
    ))}
  </el-table>
</template>
