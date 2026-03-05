import { AppContextProvider } from '@/app/entrypoint/provider';

import { cookies } from 'next/headers';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return <AppContextProvider sidebarCookieState={defaultOpen}>{children}</AppContextProvider>;
}
