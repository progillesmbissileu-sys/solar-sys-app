export type Product = {
  id: string
  designation: string
  description: string
  price: number
  pictureId: any
  categoryId: any
  brand?: string
  slug?: string
  isAvailable?: boolean
  isDeleted?: boolean
  createdAt?: any
  updatedAt?: any
  pictureUrl?: string
  categoryName?: string
}

export type ProductUpdateInput = Partial<
  Omit<
    Product,
    "id" | "createdAt" | "updatedAt" | "pictureUrl" | "categoryName" | "slug"
  >
>

export type ProductPreview = Pick<
  Product,
  | "id"
  | "designation"
  | "price"
  | "pictureUrl"
  | "categoryName"
  | "createdAt"
  | "updatedAt"
  | "brand"
>
