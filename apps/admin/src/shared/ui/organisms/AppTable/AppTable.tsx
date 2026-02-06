"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/shared/ui/atoms/Table"
import { Fragment } from "react"
import { AppTableProps } from "./types"
import { extractRecordValue } from "./helpers"

export function AppTable<T>({
  columns,
  dataSource,
  groupedSource,
  onRowSelection,
}: AppTableProps<T>) {
  return (
    <TableRoot className="border-t border-gray-200 dark:border-gray-800">
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.key}>{column.title}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <Fragment>
            {Array.isArray(dataSource) &&
              dataSource.map((item, index) => (
                <TableRow
                  key={`table-row-${index}`}
                  onClick={() => onRowSelection?.(item)}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {extractRecordValue(item, col)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </Fragment>
          <Fragment>
            {Array.isArray(groupedSource) &&
              groupedSource.map((group) => (
                <Fragment key={group.key}>
                  <TableRow>
                    <TableHeaderCell
                      scope="colgroup"
                      colSpan={6}
                      className="bg-gray-50 py-3 pl-4 sm:pl-6 dark:bg-gray-900"
                    >
                      <div className="flex gap-x-3">
                        <span>{group.label}</span>
                        {group.count && (
                          <div className="h-6 w-6 content-center rounded-full border border-gray-300 text-center font-medium text-gray-700 dark:text-gray-400">
                            {12}
                          </div>
                        )}
                      </div>
                    </TableHeaderCell>
                  </TableRow>
                  {group.data.map((item, index) => (
                    <TableRow
                      key={`table-row-${index}`}
                      onClick={() => onRowSelection?.(item)}
                    >
                      {columns.map((col) => (
                        <TableCell key={col.key}>
                          {extractRecordValue(item, col)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </Fragment>
              ))}
          </Fragment>
        </TableBody>
      </Table>
    </TableRoot>
  )
}
