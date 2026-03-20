'use server';

import { marketServiceUpdate } from '@/entities/market-service';
import { routePaths } from '@/shared/routes';
import { revalidatePath } from 'next/cache';
import { updateServiceSchema } from '../model/form-schemas';
import { buildRoute } from '@/shared/lib/router';
import z from 'zod';

export async function updateServiceAction(payload: z.infer<typeof updateServiceSchema>) {
  const response = await marketServiceUpdate(payload.id, {
    designation: payload.designation,
    contentDescription: payload.contentDescription,
    shortDescription: payload.shortDescription,
    features: payload.features,
  });

  response.success &&
    revalidatePath(buildRoute(routePaths.MARKET_SERVICES_DETAILS, { id: payload.id }));
  return response;
}
