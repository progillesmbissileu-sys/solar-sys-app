import {
  callActionSafe,
  callActionWithIdSafe,
  CollectionResponseType,
  mutation,
  mutationWithId,
} from '@/shared/api';
import {
  createPackPayload,
  ProductPackage,
  ProductPackCollectionPreview,
  updatePackPayload,
} from '../model/product-package';

export const productPackCollection = callActionSafe<
  CollectionResponseType<ProductPackCollectionPreview>
>('/api/product-packs', 'get');

export const getProductPack = callActionWithIdSafe<{
  data: ProductPackage;
}>('/api/product/{id}', 'get');

export const createProductPack = mutation<createPackPayload>('/api/product-packs', 'post');

export const updateProductPack = mutationWithId<updatePackPayload>(
  '/api/product-packs/{id}',
  'put'
);

export const deleteProductPack = callActionWithIdSafe('/api/product-packs/{id}', 'delete');

export const removeProductPackItem = callActionWithIdSafe(
  '/api/product-packs/item/{itemId}/remove',
  'delete'
);
