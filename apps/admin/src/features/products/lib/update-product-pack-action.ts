'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';

import { updateProductPack } from '@/entities/product';
import { routePaths } from '@/shared/routes';

import { updatePackFormSchema } from '../model/product-pack-form-schemas';

export const updateProductPackAction = async (payload: z.infer<typeof updatePackFormSchema>) => {
  const _payload = {
    id: payload.id,
    designation: payload.designation,
    description: payload.description,
    price: payload.price,
    items: payload.items.map((item) => ({
      productId: typeof item === 'string' ? item : item.value,
      quantity: 1,
    })),
  };

  const resp = await updateProductPack(_payload.id, _payload);

  resp.success && revalidatePath(routePaths.PRODUCTS_PACKAGES);

  return resp;
};
