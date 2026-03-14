'use server';

import { CategoryCreatePayload, CategoryUpdatePayload } from '@/entities/product';
import { callAction } from '@/shared/api';
import { routePaths } from '@/shared/routes';
import { extractFormPayload } from '@/shared/ui';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createProductCategoryAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormPayload<CategoryCreatePayload>(formData);

  const resp = await callAction<void | { error?: string; errors?: any[] }>(
    '/api/product-category',
    'POST'
  )(payload);

  console.error(resp);

  !resp && revalidatePath(routePaths.PRODUCTS_CATEGORIES);
};

export const updateProductCategoryAction = async (_prev: unknown, formData: FormData) => {
  // const payload = extractFormPayload<CategoryUpdatePayload>(formData);
  // const resp = await callAction<void | { error?: string; errors?: any[] }>(
  //   `/api/product-category/${payload.id}`,
  //   'PATCH'
  // )(payload);
  // console.error(resp);
  // !resp && redirect(routePaths.PRODUCTS_CATEGORIES);
  // await refreshPageCache()
};
