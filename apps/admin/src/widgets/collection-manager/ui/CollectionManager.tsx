"use client"

import React from "react"

import { AppTable } from "@/shared/ui/organisms/AppTable"
import type { ColumnType } from "@/shared/ui/organisms/AppTable/types"
import type { CollectionResponseType } from "@/shared/api"
import { Controls, type FilterConfig } from "./Controls"
import { cx } from "@/shared/lib/utils"

export type CollectionManagerProps<TData> = {
  collection: CollectionResponseType<TData>
  columns: Array<ColumnType<TData>>
  title?: string
  searchKey?: string
  searchPlaceholder?: string
  filters?: FilterConfig[]
  className?: string
}

export default function CollectionManager<TData>({
  collection,
  columns,
  title,
  searchKey,
  searchPlaceholder,
  filters,
  className,
}: CollectionManagerProps<TData>) {
  const dataSource = collection?.data ?? []

  return (
    <section className={cx("grid gap-y-3", className)}>
      {title ? (
        <header className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {title}
          </h2>
        </header>
      ) : null}

      <div>
        <Controls
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
          filters={filters}
        />
      </div>

      <div>
        <AppTable<TData> columns={columns} dataSource={dataSource as any} />
      </div>
    </section>
  )
}
