import { Fragment } from "react"
import { AppSidebar } from "@/app/components/layouts/ui/AppSidebar"
import { SidebarTrigger } from "@/shared/ui/molecules/sidebar/Sidebar"
import { Breadcrumbs } from "@/shared/ui/molecules/breadcrumbs/Breadcrumbs"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <AppSidebar />
      <div className="w-full">
        <header className="dark:bg-dark sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4 dark:border-gray-800">
          <SidebarTrigger className="-ml-1" />
          <div className="mr-2 h-4 w-px bg-gray-200 dark:bg-gray-800" />
          <Breadcrumbs />
        </header>
        <main>{children}</main>
      </div>
    </Fragment>
  )
}
