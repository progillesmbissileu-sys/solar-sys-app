export type ProductCategory = {
  id: string | null
  designation: string
  type: string
  parentId?: string
  slug: string | null
  createdAt?: Date
  updatedAt?: Date
}

export enum ProductCategoryType {
  CATEGORY = "CATEGORY",
  TAG = "TAG",
}

export type ProductCategoryPreview = Pick<
  ProductCategory,
  "id" | "designation" | "type" | "createdAt" | "updatedAt"
>
