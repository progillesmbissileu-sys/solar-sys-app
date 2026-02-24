import { BreadcrumbSegment } from "../model/breadcrumb-store"

export type PageContainerProps = {
  children: React.ReactNode
  pageHeader?: {
    title: string
    actions?: React.ReactNode
  }
  breadcrumbs?: BreadcrumbSegment[]
}
