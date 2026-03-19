'use server';

import { routePaths } from '@/shared/routes';
import { UpdatePackPayload, updateProductPack } from '@/entities/product';
import { revalidatePath } from 'next/cache';
import { extractFormData } from '@/shared/ui';

export const updateProductPackAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormData<UpdatePackPayload>(formData, [], (_entries) => ({
    ..._entries,
    price: parseInt(_entries.price as string),
    items: (_entries.items as string).split(',').map((item) => ({ productId: item, quantity: 1 })),
  }));

  const resp = await updateProductPack(payload.id, payload);

  resp.success && revalidatePath(routePaths.PRODUCTS_PACKAGES);

  return resp;
};
