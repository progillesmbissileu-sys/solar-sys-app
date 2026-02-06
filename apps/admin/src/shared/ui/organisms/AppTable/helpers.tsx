import { ColumnType } from "./types"

export function extractRecordValue<T>(item: any, column?: ColumnType<T>) {
  return column?.dataIndex
    ? item[column?.dataIndex]
    : column?.render
      ? column?.render(item)
      : undefined
}
