import {
  callActionSafe,
  callActionWithIdSafe,
  CollectionResponseType,
  mutation,
  mutationWithId,
} from '@/shared/api';
import { ProductCategory } from '../model/product-category';
import { CreateProductInput, Product, ProductPreview, UpdateProductInput } from '../model/product';

export const productCollection = callActionSafe<CollectionResponseType<ProductPreview>>(
  '/api/product',
  'get'
);

export const getProduct = callActionWithIdSafe<{
  data: Product;
}>('/api/product/{id}', 'get');

export const createProduct = mutation<CreateProductInput>('/api/product', 'post');

export const updateProduct = mutationWithId<UpdateProductInput>('/api/product/{id}', 'put');

// CATEGORIES

export const productCategoryCollection = callActionSafe<CollectionResponseType<ProductCategory>>(
  '/api/product-category',
  'get'
);

export const getProductCategory = callActionWithIdSafe<{ data: ProductCategory }>(
  '/api/product-category/{id}',
  'get'
);
