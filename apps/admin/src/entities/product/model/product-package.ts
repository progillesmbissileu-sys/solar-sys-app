import { ProductImage } from './product-image';

export type ProductPackage = {
  id: string;
  designation: string;
  description: string;
  price: number;
  mainImage?: ProductImage;
  slug?: string;
  items: ProductPackageItem[];
  isAvailable?: boolean;
  isDeleted?: boolean;
  createdAt?: any;
  updatedAt?: any;
};

export type ProductPackageItem = {
  id: string;
  productName: string;
  productId: string;
  quantity: number;
  productMainImageUrl: string;
};

// VIEW MODELS

export type ProductPackCollectionPreview = {
  id: string;
  designation: string;
  price: number;
  mainImageUrl?: string;
  isAvailable?: boolean;
  createdAt?: any;
  updatedAt?: any;
  items: ProductPackageItem[];
};

// PAYLOADS

export type CreatePackPayload = {
  designation: string;
  description: string;
  price: number;
  mainImageId?: string;
  stockQuantity?: number;
  lowStockThreshold?: number;
  // items: Array<{
  //   productId: string;
  //   quantity: number;
  // }>;
  items: string[];
};

export type UpdatePackPayload = CreatePackPayload & { id: string };
