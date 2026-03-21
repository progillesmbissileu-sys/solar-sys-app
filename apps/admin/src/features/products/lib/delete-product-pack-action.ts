'use server';

import { revalidatePath } from 'next/cache';

import { deleteProductPack } from '@/entities/product';
import { routePaths } from '@/shared/routes';

export const deleteProductPackAction = async (packId: string) => {
  const resp = await deleteProductPack(packId);

  resp.success && revalidatePath(routePaths.PRODUCTS_PACKAGES);

  return resp;
};
