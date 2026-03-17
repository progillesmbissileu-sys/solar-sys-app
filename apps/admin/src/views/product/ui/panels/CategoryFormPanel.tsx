'use client';

import { PanelComponentProps } from '@/widgets/container';
import { ProductCategory } from '@/entities/product';
import { UpdateCategoryForm } from '@/features/products';

export type CategoryFormPanelProps = {
  categories?: ProductCategory[];
  initialValues?: ProductCategory;
};

export function CategoryFormPanel({ panelProps }: PanelComponentProps) {
  const { categories, initialValues } = (panelProps || {}) as CategoryFormPanelProps;

  return <UpdateCategoryForm categories={categories || []} initialValues={initialValues} />;
}
