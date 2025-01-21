import { defineComponent } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
// import { useTable } from '@/hooks/useTable'
import notDataImage from '@/assets/images/notData.png' // 采用 import 语法引入图片
import { ColumnProps, RenderScope } from '../model'
// const { handleSizeChange, handleCurrentChange } = useTable()
export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    },
    data: {
      type: Array,
      default: [],
      required: true
    },
    requestApi: {}
  },

  setup(props) {
    console.log(
      '%c [  ]-16',
      'font-size:13px; background:pink; color:#bf2c9f;',
      props.data
    )

    return () => (
      <div>
        <ElTable data={props.data} border>
          {props.data.length === 0 ? (
            <div class="table-empty">
              <img src={notDataImage} alt="notData" />
              <div>暂无数据</div>
            </div>
          ) : (
            props.columns.map((column) => (
              <ElTableColumn
                key={column.prop}
                prop={column.prop}
                label={column.label}
                width={column.width}
              >
                {{
                  default: (scope: RenderScope) => {
                    const { row } = scope
                    return column.render ? column.render(row) : row[column.prop]
                  }
                }}
              </ElTableColumn>
            ))
          )}
        </ElTable>
      </div>
    )

    {
      /* <ElPagination
          current-page={pageable.currentPage}
          page-size={pageable.pageSize}
          page-sizes={[5, 10, 15, 20]}
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
        /> */
    }
    //   </div>
    // )
  }
})
