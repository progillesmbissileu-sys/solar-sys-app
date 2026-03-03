export type Product = {
  id: string;
  designation: string;
  description: string;
  price: number;
  pictureId: string | null;
  categoryId: string;
  brand?: string;
  slug?: string;
  isAvailable?: boolean;
  isDeleted?: boolean;
  createdAt?: any;
  updatedAt?: any;
  pictureUrl?: string;
  pictureAlt?: string;
  pictureTitle?: string;
  categoryName?: string;
};

export type ProductUpdateInput = Partial<
  Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'pictureUrl' | 'categoryName' | 'slug'>
>;

export type ProductPreview = Pick<
  Product,
  | 'id'
  | 'designation'
  | 'price'
  | 'pictureUrl'
  | 'pictureAlt'
  | 'pictureTitle'
  | 'categoryName'
  | 'createdAt'
  | 'updatedAt'
  | 'brand'
>;
