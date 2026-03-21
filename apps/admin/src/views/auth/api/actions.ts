'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { callActionSafe } from '@/shared/api';
import { AuthTokens, setAuthTokens } from '@/shared/lib';
import { routePaths } from '@/shared/routes';

const loginSchema = z.object({ email: z.email(), password: z.string().min(6) });

export default async function loginAction(
  redirectTo: string | undefined,
  payload: z.infer<typeof loginSchema>
) {
  const response = await callActionSafe<{
    data: { accessToken: string; refreshToken: string };
  }>('/api/login', 'post', {
    skipAuth: true,
  })(undefined, payload);

  if (response?.success) {
    const tokens: AuthTokens = {
      accessToken: response.data.data?.accessToken,
      refreshToken: response.data.data?.refreshToken,
    };
    await setAuthTokens(tokens.accessToken, tokens.refreshToken);

    redirect(redirectTo ?? routePaths.DASHBOARD);
  }

  return response;
}
