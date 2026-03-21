import { LoginView } from '@/views/auth';

import { AppRouterProps } from '../../_lib';

export default async function Page({ searchParams }: AppRouterProps) {
  const params = await searchParams;

  return <LoginView redirectTo={params.redirect as string} />;
}
