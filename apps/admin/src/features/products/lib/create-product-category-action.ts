'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';

import { createCategory } from '@/entities/product';
import { routePaths } from '@/shared/routes';

import { categorySchema } from '../ui/forms/ProductCategoryForm';

export const createProductCategoryAction = async (payload: z.infer<typeof categorySchema>) => {
  const resp = await createCategory(payload);

  resp.success && revalidatePath(routePaths.PRODUCTS_CATEGORIES);

  return resp;
};
