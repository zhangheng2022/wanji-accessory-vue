import type { VxeColumnPropTypes } from "vxe-table/types"

export const StatusColumnSlots: VxeColumnPropTypes.Slots = {
  default: ({ row, column }) => {
    const cellValue = row[column.field]
    const [type, value] = cellValue ? ["success", "启用"] : ["danger", "禁用"]
    return [<span class={`el-tag el-tag--${type} el-tag--plain`}>{value}</span>]
  }
}
