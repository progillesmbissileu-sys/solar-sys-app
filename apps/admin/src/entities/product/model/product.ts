import { ProductImage } from "./product-image";

export type Product = {
  id: string;
  designation: string;
  description: string;
  price: number;
  categoryId: string;
  brand?: string;
  slug?: string;
  isAvailable?: boolean;
  isDeleted?: boolean;
  createdAt?: any;
  updatedAt?: any;
  picture: ProductImage  
  categoryName?: string;
  images?: ProductImage[];
};

export type ProductUpdateInput = Partial<
  Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'categoryName' | 'slug'|"picture"|"images"|'isDeleted' | 'isAvailable'>
>;

export type ProductPreview = Pick<
  Product,
  | 'id'
  | 'designation'
  | 'price'
  | 'categoryName'
  | 'createdAt'
  | 'updatedAt'
  | 'brand'
> & {
  thumbnailUrl: string
};
