import { Fragment } from 'react';
import { AppSidebar } from '@/app/components/layouts/ui/AppSidebar';
import { Breadcrumbs, SidebarTrigger } from '@/shared/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <AppSidebar />
      <div className="h-full w-full">
        <header className="sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4 xl:h-16 dark:border-gray-800 dark:bg-dark">
          <SidebarTrigger className="-ml-1" />
          <div className="mr-2 h-4 w-px bg-gray-200 dark:bg-gray-800" />
          <Breadcrumbs />
        </header>
        <main className="xl:h-[calc(100%-64px)]">{children}</main>
      </div>
    </Fragment>
  );
}
