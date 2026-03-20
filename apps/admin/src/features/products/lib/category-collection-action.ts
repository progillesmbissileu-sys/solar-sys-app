'use server';

import { productCategoryCollection } from '@/entities/product';

export const getCategoriesAction = async (query: { page?: number; limit?: number; q?: string }) => {
  const response = await productCategoryCollection({
    page: query.page || 1,
    limit: query.limit || 10,
    q: query.q,
  });
  return response;
};
