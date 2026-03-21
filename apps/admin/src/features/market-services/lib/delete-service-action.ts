'use server';

import { redirect } from 'next/navigation';

import { marketServiceDelete } from '@/entities/market-service';
import { routePaths } from '@/shared/routes';

export async function deleteServiceAction(serviceId: string) {
  const response = await marketServiceDelete(serviceId);

  response.success && redirect(routePaths.MARKET_SERVICES);
  return response;
}
