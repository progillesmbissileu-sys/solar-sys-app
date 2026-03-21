import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppContextProvider } from '@/app/entrypoint/provider';
import { checkIdentityAction } from '@/features/security';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  const response = await checkIdentityAction();
  console.log({ response: JSON.stringify(response, null, 2) });

  if (!response.success) {
    if ([401, 403].includes(response.error.status)) {
      redirect('/logout');
    } else {
      throw new Error(response.error.message);
    }
  }

  return <AppContextProvider sidebarCookieState={defaultOpen}>{children}</AppContextProvider>;
}
