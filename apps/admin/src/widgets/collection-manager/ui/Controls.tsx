"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/shared/ui/atoms/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/atoms/Select"
import { cx } from "@/shared/lib/utils"

export type FilterOption = {
  label: string
  value: string
}

export type FilterConfig = {
  key: string
  label: string
  options: FilterOption[]
}

type ControlsProps = {
  className?: string
  searchKey?: string
  searchPlaceholder?: string
  filters?: FilterConfig[]
}

export function Controls({
  className,
  searchKey = "q",
  searchPlaceholder = "Search...",
  filters = [],
}: ControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = React.useState<string>(
    searchParams.get(searchKey) ?? "",
  )

  const debounceRef = React.useRef<number | null>(null)

  const updateParam = React.useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === null || value === "") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams],
  )

  // Sync local state when URL changes externally
  React.useEffect(() => {
    const urlValue = searchParams.get(searchKey) ?? ""
    setSearch(urlValue)
     
  }, [searchParams, searchKey])

  const onSearchChange = (value: string) => {
    setSearch(value)
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => {
      updateParam(searchKey, value.trim() === "" ? null : value)
    }, 300)
  }

  return (
    <div className={cx("flex w-full flex-col gap-3 sm:flex-row", className)}>
      <div className="w-full sm:max-w-sm">
        <Input
          type="search"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {filters.map((filter) => {
        const current = searchParams.get(filter.key) ?? ""
        return (
          <Select
            key={filter.key}
            value={current || undefined}
            onValueChange={(val) => updateParam(filter.key, val || null)}
          >
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      })}
    </div>
  )
}
