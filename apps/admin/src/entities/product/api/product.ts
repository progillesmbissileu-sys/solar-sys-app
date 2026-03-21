import {
  callActionSafe,
  callActionWithIdSafe,
  CollectionResponseType,
  mutation,
  mutationWithId,
} from '@/shared/api';

import {
  CreateProductPayload,
  Product,
  ProductPreview,
  UpdateProductPayload,
} from '../model/product';
import { ProductCategory } from '../model/product-category';
import { CreateCategoryPayload, UpdateCategoryPayload } from '../model/product-category';

export const productCollection = callActionSafe<CollectionResponseType<ProductPreview>>(
  '/api/product',
  'get'
);

export const getProduct = callActionWithIdSafe<{
  data: Product;
}>('/api/product/{id}', 'get');

export const createProduct = mutation<CreateProductPayload>('/api/product', 'post');

export const updateProduct = mutationWithId<UpdateProductPayload>('/api/product/{id}', 'put');

// CATEGORIES

export const productCategoryCollection = callActionSafe<CollectionResponseType<ProductCategory>>(
  '/api/product-category',
  'get'
);

export const getProductCategory = callActionWithIdSafe<{ data: ProductCategory }>(
  '/api/product-category/{id}',
  'get'
);

export const createCategory = mutation<CreateCategoryPayload>('/api/product-category', 'post');

export const updateCategory = mutationWithId<UpdateCategoryPayload>(
  '/api/product-category/{id}',
  'put'
);

// MARKET ROUTES (unprotected routes)
export const marketProductCollection = callActionSafe<CollectionResponseType<ProductPreview>>(
  '/api/market/products',
  'get',
  { skipAuth: true }
);

export const marketCategoryCollection = callActionSafe<CollectionResponseType<ProductPreview>>(
  '/api/market/products/categories',
  'get',
  { skipAuth: true }
);
