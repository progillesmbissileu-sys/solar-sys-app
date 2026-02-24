import { useEffect } from "react"
import { useBreadcrumbs } from "../lib/use-breadcrumbs"
import { PageContainerProps } from "./types"

export function DesktopPageContainer({
  children,
  breadcrumbs,
  pageHeader,
}: PageContainerProps) {
  const { setBreadcrumbs } = useBreadcrumbs()

  useEffect(() => {
    if (breadcrumbs) {
      setBreadcrumbs("page-header", breadcrumbs)
    }
  }, [breadcrumbs])

  return (
    <div>
      <header className="flex flex-col justify-between border-b px-5 pb-3 pt-5 xl:min-h-52">
        {pageHeader?.title && (
          <h1 className="text-xl font-medium capitalize">{pageHeader.title}</h1>
        )}
        <div></div>
        {pageHeader?.actions && (
          <div className="flex justify-end">{pageHeader.actions}</div>
        )}
      </header>
      <main>{children}</main>
    </div>
  )
}
