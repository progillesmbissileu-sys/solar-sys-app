import { callAction, callActionWithId, CollectionResponseType } from '@/shared/api';
import { ProductCategory } from '../model/product-category';
import { Product, ProductPreview } from '../model/product';

export const productCollection = callAction<void, CollectionResponseType<ProductPreview>>(
  '/api/product',
  'get'
);

export const getProduct = callActionWithId<
  void,
  {
    data: Product;
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
