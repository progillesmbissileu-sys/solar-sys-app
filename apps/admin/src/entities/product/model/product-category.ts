export type ProductCategory = {
  id: string | null;
  designation: string;
  type: string;
  parentId?: string;
  slug: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type UpdateCategoryPayload = Pick<ProductCategory, 'designation' | 'type' | 'parentId'>;

export type CreateCategoryPayload = Pick<ProductCategory, 'designation' | 'type' | 'parentId'>;

export enum ProductCategoryType {
  CATEGORY = 'CATEGORY',
  TAG = 'TAG',
}

export type ProductCategoryPreview = Pick<
  ProductCategory,
  'id' | 'designation' | 'type' | 'createdAt' | 'updatedAt'
>;
