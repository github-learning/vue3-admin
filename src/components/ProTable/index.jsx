import { defineComponent } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'

export default defineComponent({
  props: {
    tableColumns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    return () => (
      <div>
        <ElTable data={props.data} border style="width: 100%">
          {props.tableColumns.map((column) => (
            <ElTableColumn
              key={column.prop}
              prop={column.prop}
              label={column.label}
              width={column.width}
            >
              {{
                default: column.render
                  ? ({ row }) => column.render(row) // 如果有 render 方法，则调用
                  : ({ row }) => <span>{row[column.prop]}</span> // 否则默认渲染列数据
              }}
            </ElTableColumn>
          ))}
        </ElTable>
      </div>
    )
  }
})
// {/* 数据表格 */}
// setup(props, { emit, attrs }) {
//   return () => (
//     <div>
//       <el-table data={props.data} border style="width: 100%">
//         {props.tableColumns.map((column) => (
//           <el-table-column
//             key={column.prop}
//             prop={column.prop}
//             label={column.label}
//             width={column.width}
//           ></el-table-column>
//         ))}
//       </el-table>
//     </div>
//   )
// }
