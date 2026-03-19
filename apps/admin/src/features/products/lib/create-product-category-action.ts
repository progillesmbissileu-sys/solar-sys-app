'use server';

import { CategoryCreatePayload } from '@/entities/product';
import { callAction } from '@/shared/api';
import { routePaths } from '@/shared/routes';
import { extractFormData } from '@/shared/ui';
import { revalidatePath } from 'next/cache';

export const createProductCategoryAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormData<CategoryCreatePayload>(formData);

  const resp = await callAction<void | { error?: string; errors?: any[] }>(
    '/api/product-category',
    'POST'
  )(payload);

  !resp && revalidatePath(routePaths.PRODUCTS_CATEGORIES);
};
