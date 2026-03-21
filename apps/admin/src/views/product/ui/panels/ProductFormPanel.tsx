'use client';

import { Product,ProductCategory } from '@/entities/product';
import { ProductForm } from '@/features/products';
import { PanelComponentProps } from '@/widgets/container';

export type ProductFormPanelProps = {
  categories?: ProductCategory[];
  initialValues?: Partial<Product>;
};

export function ProductFormPanel({ panelProps }: PanelComponentProps) {
  const { initialValues } = (panelProps || {}) as ProductFormPanelProps;

  return <ProductForm initialValues={initialValues as any} />;
}
