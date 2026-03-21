'use server';

import { revalidatePath } from 'next/cache';

import { removeProductPackItem } from '@/entities/product';
import { routePaths } from '@/shared/routes';

export const removeProductPackItemAction = async (itemId: string) => {
  const resp = await removeProductPackItem(itemId);

  resp.success && revalidatePath(routePaths.PRODUCTS_PACKAGES);

  return resp;
};
