import React from "react"

export type ColumnType<T> = {
  key: string
  title: string
  dataIndex?: keyof T
  align?: "start" | "center" | "end"
  render?: (record: T) => React.ReactNode
}

export type DataSourceType<T> = Array<T>

export type AppTableProps<T> =
  | {
      columns: Array<ColumnType<T>>
      onRowSelection?: (record: Partial<T>) => void
      isLoading?: boolean
      groupedSource?: never
      dataSource: DataSourceType<{ key?: string | number } & T>
    }
  | {
      columns: Array<ColumnType<T>>
      onRowSelection?: (record: T) => void
      isLoading?: boolean
      dataSource?: never
      groupedSource: Array<{
        key: string | number
        count?: number
        label: string
        data: DataSourceType<{ key?: string | number } & T>
      }>
    }
