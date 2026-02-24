import { create } from "zustand"

export type BreadcrumbSegment = {
  label: string
  href?: string
}

type BreadcrumbState = {
  breadcrumbs: Record<string, Array<BreadcrumbSegment>>
}

type BreadcrumbAction = {
  update: (key: string, segments: Array<BreadcrumbSegment>) => void
}

export type BreadcrumbStoreType = BreadcrumbState & BreadcrumbAction

export const useBreadcrumbStore = create<BreadcrumbStoreType>()((set) => ({
  breadcrumbs: {},
  update: (key, segments) =>
    set((state) => ({
      breadcrumbs: { ...state.breadcrumbs, [key]: segments },
    })),
}))
