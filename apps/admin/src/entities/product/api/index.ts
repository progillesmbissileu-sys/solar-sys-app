import { callAction, callActionWithId, CollectionResponseType } from '@/shared/api';
import { ProductCategory } from '../model/product-category';

export const productCollection = callAction<
  void,
  CollectionResponseType<{
    id: string;
    slug: string;
    designation: string;
    price: number;
    categoryName: string;
    categoryId: string;
    mainImageUrl: string;
    brand?: string;
    createdAt: string;
    updatedAt: string;
  }>
>('/api/product', 'get');

export const getProduct = callActionWithId<
  void,
  {
    data: {
      id: string;
      slug: string;
      designation: string;
      price: number;
      categoryName: string;
      categoryId: string;
      mainImageUrl: string;
      brand?: string;
      createdAt: string;
      updatedAt: string;
    };
  }
>('/api/product/{id}', 'get');

export const productCategoryCollection = callAction<void, CollectionResponseType<ProductCategory>>(
  '/api/product-category',
  'get'
);

export const getProductCategory = callActionWithId<void, { data: ProductCategory }>(
  '/api/product-category/{id}',
  'get'
);
