import {
  callAction,
  callActionSafe,
  callActionWithIdSafe,
  CollectionResponseType,
} from '@/shared/api';
import { ProductCategory } from '../model/product-category';
import { Product, ProductPreview } from '../model/product';

export const productCollection = callActionSafe<CollectionResponseType<ProductPreview>>(
  '/api/product',
  'get'
);

export const getProduct = callActionWithIdSafe<{
  data: Product;
}>('/api/product/{id}', 'get');

export const productCategoryCollection = callAction<CollectionResponseType<ProductCategory>>(
  '/api/product-category',
  'get'
);

export const getProductCategory = callActionWithIdSafe<{ data: ProductCategory }>(
  '/api/product-category/{id}',
  'get'
);
