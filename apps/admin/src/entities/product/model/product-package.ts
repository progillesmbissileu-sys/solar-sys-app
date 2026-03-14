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

// PAYLOADS

export type createPackPayload = {
  designation: string;
  description: string;
  price: number;
  mainImage?: File;
  stockQuantity?: number;
  lowStockThreshold?: number;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
};

export type updatePackPayload = createPackPayload;

//VIEW MODELS

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
