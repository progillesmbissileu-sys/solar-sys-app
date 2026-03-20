'use server';

import { marketServiceDelete } from '@/entities/market-service';
import { routePaths } from '@/shared/routes';
import { redirect } from 'next/navigation';

export async function deleteServiceAction(serviceId: string) {
  const response = await marketServiceDelete(serviceId);

  response.success && redirect(routePaths.MARKET_SERVICES);
  return response;
}
