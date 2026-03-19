'use server';

import { extractFormData } from '@/shared/ui';
import { marketServiceUpdate } from '@/entities/market-service';
import { routePaths } from '@/shared/routes';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { updateServiceSchema } from '../model/form-schemas';
import { buildRoute } from '@/shared/lib/router';

export async function updateServiceAction(_prev: unknown, formData: FormData) {
  const _payload = extractFormData<z.infer<typeof updateServiceSchema>>(formData);

  const response = await marketServiceUpdate(_payload.id, {
    designation: _payload.designation,
    contentDescription: _payload.contentDescription,
    shortDescription: _payload.shortDescription,
    features: _payload.features,
  });

  response.success &&
    revalidatePath(buildRoute(routePaths.MARKET_SERVICES_DETAILS, { id: _payload.id }));
  return response;
}
