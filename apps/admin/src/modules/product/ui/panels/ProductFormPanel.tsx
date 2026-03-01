'use client';

import { PanelComponentProps } from '@/widgets/container';
import { ProductCategory, Product } from '@/entities/product';
import ProductForm from '../forms/ProductForm';
import { createProductAction, updateProductAction } from '../../api/product-actions';

export type ProductFormPanelProps = {
  categories?: ProductCategory[];
  initialValues?: Partial<Product>;
};

export function ProductFormPanel({ panelProps }: PanelComponentProps) {
  const { categories, initialValues } = (panelProps || {}) as ProductFormPanelProps;

  return (
    <ProductForm
      categories={categories || []}
      initialValues={initialValues as any}
      serverAction={initialValues?.id ? updateProductAction : createProductAction}
    />
  );
}
