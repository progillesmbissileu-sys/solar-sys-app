import { callAction, callActionSafe, callActionWithId, CollectionResponseType } from '@/shared/api';
import { ProductCategory } from '../model/product-category';
import { Product, ProductPreview } from '../model/product';

export const productCollection = callAction<CollectionResponseType<ProductPreview>>(
  '/api/product',
  'get'
);

export const getProduct = callActionWithId<{
  data: Product;
}>('/api/product/{id}', 'get');

export const productCategoryCollection = callAction<CollectionResponseType<ProductCategory>>(
  '/api/product-category',
  'get'
);

export const getProductCategory = callActionWithId<{ data: ProductCategory }>(
  '/api/product-category/{id}',
  'get'
);
