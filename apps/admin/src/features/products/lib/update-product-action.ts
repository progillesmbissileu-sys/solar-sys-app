'use server';

import { callActionWithIdSafe } from '@/shared/api';
import { routePaths } from '@/shared/routes';
import { extractFormPayload } from '@/shared/ui';
import { redirect } from 'next/navigation';
import { UpdateProductInput } from '@/entities/product';
import { buildRoute } from '@/shared/lib/router';

export const updateProductAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormPayload<UpdateProductInput & { id: string }>(formData);

  const _payload = {
    designation: payload.designation,
    description: payload.description,
    categoryId: payload.categoryId,
    price: payload.price,
    brand: payload.brand,
  };

  const resp = await callActionWithIdSafe<void>(`/api/product/:id`, 'PATCH')(payload.id, _payload);

  resp.success && redirect(buildRoute(routePaths.PRODUCTS_OVERVIEW, { id: payload.id }));

  return resp;
};
