'use server';

import { redirect } from 'next/navigation';

import { callAction } from '@/shared/api';

export async function checkIdentityAction() {
  return await callAction('/api/me', 'GET')();
}
