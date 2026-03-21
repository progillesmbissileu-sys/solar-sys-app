import {
  callActionSafe,
  callActionWithIdSafe,
  CollectionResponseType,
  mutation,
  mutationWithId,
} from '@/shared/api';

import {
  CreatePackPayload,
  ProductPackage,
  ProductPackCollectionPreview,
  UpdatePackPayload,
} from '../model/product-package';

export const productPackCollection = callActionSafe<
  CollectionResponseType<ProductPackCollectionPreview>
>('/api/product-packs', 'get');

export const getProductPack = callActionWithIdSafe<{
  data: ProductPackage;
}>('/api/product-packs/{id}', 'get');

export const createProductPack = mutation<CreatePackPayload>('/api/product-packs', 'post');

export const updateProductPack = mutationWithId<UpdatePackPayload>(
  '/api/product-packs/{id}',
  'put'
);

export const deleteProductPack = callActionWithIdSafe('/api/product-packs/{id}', 'delete');

export const removeProductPackItem = callActionWithIdSafe(
  '/api/product-packs/item/{itemId}/remove',
  'delete'
);
