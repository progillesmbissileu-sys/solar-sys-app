'use server';

import { routePaths } from '@/shared/routes';
import { revalidatePath } from 'next/cache';
import { UpdateProductPayload } from '@/entities/product';
import { updateProduct } from '@/entities/product/api/product';
import { extractFormData } from '@/shared/ui';

export const updateProductAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormData<UpdateProductPayload & { id: string }>(formData);

  const _payload = {
    designation: payload.designation,
    description: payload.description,
    categoryId: payload.categoryId,
    price: payload.price,
    brand: payload.brand,
  };

  const resp = await updateProduct(payload.id, _payload);

  resp.success && revalidatePath(routePaths.PRODUCTS_OVERVIEW.replace(':id', payload.id), 'page');

  return resp;
};
