'use server';

import { routePaths } from '@/shared/routes';
import { removeProductPackItem } from '@/entities/product';
import { revalidatePath } from 'next/cache';

export const removeProductPackItemAction = async (itemId: string) => {
  const resp = await removeProductPackItem(itemId);

  resp.success && revalidatePath(routePaths.PRODUCTS_PACKAGES);

  return resp;
};
