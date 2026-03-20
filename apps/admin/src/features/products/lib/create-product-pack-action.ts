'use server';

import { routePaths } from '@/shared/routes';
import { createProductPack } from '@/entities/product';
import { revalidatePath } from 'next/cache';
import { createPackFormSchema } from '../model/product-pack-form-schemas';
import z from 'zod';

export const createProductPackAction = async (payload: z.infer<typeof createPackFormSchema>) => {
  const _payload = {
    designation: payload.designation,
    description: payload.description,
    price: payload.price,
    items: payload.items.map((item) => ({ productId: item, quantity: 1 })),
  };

  const resp = await createProductPack(_payload);

  resp.success && revalidatePath(routePaths.PRODUCTS_PACKAGES);

  return resp;
};
