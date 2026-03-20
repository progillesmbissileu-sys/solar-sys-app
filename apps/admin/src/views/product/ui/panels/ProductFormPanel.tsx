'use client';

import { PanelComponentProps } from '@/widgets/container';
import { ProductCategory, Product } from '@/entities/product';
import { ProductForm } from '@/features/products';

export type ProductFormPanelProps = {
  categories?: ProductCategory[];
  initialValues?: Partial<Product>;
};

export function ProductFormPanel({ panelProps }: PanelComponentProps) {
  const { initialValues } = (panelProps || {}) as ProductFormPanelProps;

  return <ProductForm initialValues={initialValues as any} />;
}
