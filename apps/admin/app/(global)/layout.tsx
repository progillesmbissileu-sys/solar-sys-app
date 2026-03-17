import { AppContextProvider } from '@/app/entrypoint/provider';
import { callActionSafe } from '@/shared/api';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  const response = await callActionSafe('/api/me', 'GET')();

  if (!response.success && [401, 403].includes(response.error.status)) {
    redirect('/logout');
  }

  return <AppContextProvider sidebarCookieState={defaultOpen}>{children}</AppContextProvider>;
}
