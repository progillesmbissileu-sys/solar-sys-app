import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { callAction } from '@/shared/api';
import { ACCESS_TOKEN_COOKIE_NAME,REFRESH_TOKEN_COOKIE_NAME } from '@/shared/lib/auth/constant';

export async function DELETE() {
  const cookieStore = await cookies();

  await callAction('/api/logout', 'get')();

  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);

  return new NextResponse(null, { status: 204 });
}
