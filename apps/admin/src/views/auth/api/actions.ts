'use server';

import { callActionSafe } from '@/shared/api';
import { AuthTokens, setAuthTokens } from '@/shared/lib';
import { routePaths } from '@/shared/routes';
import { redirect } from 'next/navigation';

export default async function loginAction(
  redirectTo: string | undefined,
  _prev: unknown,
  formData: FormData
) {
  const credentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const response = await callActionSafe<{
    data: { accessToken: string; refreshToken: string };
  }>('/api/login', 'post', {
    skipAuth: true,
  })(undefined, credentials);

  if (response?.success) {
    const tokens: AuthTokens = {
      accessToken: response.data.data?.accessToken,
      refreshToken: response.data.data?.refreshToken,
    };
    await setAuthTokens(tokens.accessToken, tokens.refreshToken);

    redirect(redirectTo ?? routePaths.DASHBOARD);
  }
}
