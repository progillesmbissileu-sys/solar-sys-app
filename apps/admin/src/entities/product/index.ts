// API
export * from './api/product';
export * from './api/product-pack';

// MODELS
export type {
  Product,
  ProductPreview,
  CreateProductPayload,
  UpdateProductPayload,
} from './model/product';
export { MAX_PRODUCT_IMAGES, type ProductImage } from './model/product-image';
export {
  type ProductCategory,
  type ProductCategoryPreview,
  type UpdateCategoryPayload,
  type CreateCategoryPayload,
  ProductCategoryType,
} from './model/product-category';

export type {
  ProductPackCollectionPreview,
  UpdatePackPayload,
  CreatePackPayload,
  ProductPackageItem,
  ProductPackage,
} from './model/product-package';
