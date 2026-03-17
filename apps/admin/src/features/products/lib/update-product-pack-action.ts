'use server';

import { routePaths } from '@/shared/routes';
import { extractFormPayload } from '@/shared/ui';
import { UpdatePackPayload, updateProductPack } from '@/entities/product';
import { revalidatePath } from 'next/cache';

export const updateProductPackAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormPayload<UpdatePackPayload>(formData, [], (_entries) => ({
    ..._entries,
    price: parseInt(_entries.price as string),
    items: (_entries.items as string).split(',').map((item) => ({ productId: item, quantity: 1 })),
  }));

  const resp = await updateProductPack(payload.id, payload);

  resp.success && revalidatePath(routePaths.PRODUCTS_PACKAGES);

  return resp;
};
