import { ProductImage } from './product-image';

export type ProductPackage = {
  id: string;
  designation: string;
  description: string;
  price: number;
  mainImage: ProductImage;
  slug?: string;
  isAvailable?: boolean;
  isDeleted?: boolean;
  createdAt?: any;
  updatedAt?: any;
};

export type ProductPackageItem = {
  id: string;
  productId: string;
  quantity: number;
};
