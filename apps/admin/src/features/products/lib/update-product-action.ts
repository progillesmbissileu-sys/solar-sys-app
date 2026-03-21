'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';

import { updateProduct } from '@/entities/product/api/product';
import { routePaths } from '@/shared/routes';

import { updateProductSchema } from '../model/product-form-schemas';

export const updateProductAction = async (payload: z.infer<typeof updateProductSchema>) => {
  const _payload = {
    designation: payload.designation,
    description: payload.description,
    categoryId: payload.categoryId,
    price: payload.price,
    brand: payload.brand,
  };

  const resp = await updateProduct(payload.id, _payload);

  resp.success && revalidatePath(routePaths.PRODUCTS_OVERVIEW.replace('{id}', payload.id), 'page');

  return resp;
};
