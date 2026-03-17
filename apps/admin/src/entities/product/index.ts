// API
export * from './api/product';
export * from './api/product-pack';

// MODELS
export type {
  Product,
  ProductPreview,
  CreateProductInput,
  UpdateProductInput,
} from './model/product';
export type { ProductImage } from './model/product-image';
export {
  type ProductCategory,
  type ProductCategoryPreview,
  type UpdateCategoryInput as CategoryUpdatePayload,
  type CreateCategoryInput as CategoryCreatePayload,
  ProductCategoryType,
} from './model/product-category';

export type {
  ProductPackCollectionPreview,
  UpdatePackPayload,
  CreatePackPayload,
  ProductPackageItem,
  ProductPackage,
} from './model/product-package';
