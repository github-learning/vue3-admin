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
          {{
            // 使用 #empty 插槽设置空数据时的内容
            empty: () => (
              <div class="table-empty">
                <img src={notDataImage} alt="notData" />
                <div>暂无数据</div>
              </div>
            ),
            default: () =>
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
                      return column.render
                        ? column.render(row)
                        : row[column.prop]
                    }
                  }}
                </ElTableColumn>
              ))
          }}
        </ElTable>
      </div>
    )
  }
})
