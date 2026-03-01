'use server';

import { callAction } from '@/shared/api';
import { routePaths } from '@/shared/routes';
import { extractFormPayload } from '@/shared/ui/organisms/Form';
import { redirect } from 'next/navigation';
import { ProductUpdateInput } from '@/entities/product/model/product';

export type ProductCreatePayload = Omit<ProductUpdateInput, 'isDeleted' | 'isAvailable'>;

export const createProductAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormPayload<ProductCreatePayload>(formData);

  const resp = await callAction<ProductCreatePayload, void | { error?: string; errors?: any[] }>(
    '/api/product',
    'POST'
  )(payload);

  console.error(resp);
  !resp && redirect(routePaths.PRODUCTS);
};

export const updateProductAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormPayload<ProductUpdateInput & { id: string }>(formData);

  const resp = await callAction<ProductUpdateInput, void | { error?: string; errors?: any[] }>(
    `/api/product/${payload.id}`,
    'PATCH'
  )(payload);

  console.error(resp);
  !resp && redirect(routePaths.PRODUCTS);
};

