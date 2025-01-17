import { defineComponent } from 'vue'
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import { useTable } from '@/hooks/useTable'
const { handleSizeChange, handleCurrentChange } = useTable()
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
    console.log(
      '%c [  ]-16',
      'font-size:13px; background:pink; color:#bf2c9f;',
      props
    )
    // 定义分页状态
    const pageable = reactive({
      currentPage: 1,
      pageSize: 10,
      total: props.data.length
    })
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
                  : ({ row }) => {
                      row[column.prop]
                    } // 否则默认渲染列数据
              }}
            </ElTableColumn>
          ))}
        </ElTable>

        <ElPagination
          current-page={pageable.currentPage}
          page-size={pageable.pageSize}
          page-sizes={[10, 25, 50, 100]}
          total={pageable.total}
          layout="total, sizes, prev, pager, next, jumper"
          // 使用 update 事件
          onUpdate:page-size={(size) => {
            pageable.pageSize = size
            handleSizeChange(size)
          }}
          onUpdate:current-page={(page) => {
            pageable.currentPage = page
            handleCurrentChange(page)
          }}
        />
      </div>
    )
  }
})
