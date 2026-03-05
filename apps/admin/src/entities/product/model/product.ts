export type Product = {
  id: string;
  designation: string;
  description: string;
  price: number;
  category: {
    id: string;
    designation?: string;
  };
  mainImage: ProductImage;
  brand: string;
  slug?: string;
  isAvailable?: boolean;
  isDeleted?: boolean;
  stockQuantity: number;
  lowStockThreshold: number;
  createdAt?: any;
  updatedAt?: any;
  images?: ProductImage[];
};

export type CreateProductInput = {
  designation: string;
  description: string;
  categoryId: string;
  mainImageId: string;
  price: number;
  brand?: string;
  imageIds?: string[];
};

export type UpdateProductInput = {
  designation: string;
  description: string;
  categoryId: string;
  mainImageId: string;
  price: number;
  brand?: string;
  imageIds?: string[];
};

export type ProductPreview = Pick<
  Product,
  | 'id'
  | 'designation'
  | 'price'
  | 'category'
  | 'createdAt'
  | 'updatedAt'
  | 'brand'
  | 'stockQuantity'
  | 'mainImage'
>;

export type ProductImage = {
  id?: string;
  title: string;
  url: string;
  alt: string;
};
