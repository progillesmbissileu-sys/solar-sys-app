'use server';

import { routePaths } from '@/shared/routes';
import { extractFormPayload } from '@/shared/ui';
import { CreatePackPayload, createProductPack } from '@/entities/product';
import { revalidatePath } from 'next/cache';

export const createProductPackAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormPayload<CreatePackPayload>(formData, ['id'], (_entries) => ({
    ..._entries,
    price: parseInt(_entries.price as string),
    items: (_entries.items as string).split(',').map((item) => ({ productId: item, quantity: 1 })),
  }));

  const resp = await createProductPack(payload);

  resp.success && revalidatePath(routePaths.PRODUCTS_PACKAGES);

  return resp;
};
