'use client';

import { PanelComponentProps } from '@/widgets/container';
import UpdateCategoryForm from '../forms/UpdateCategoryForm';
import { ProductCategory } from '@/entities/product';

export type CategoryFormPanelProps = {
  categories?: ProductCategory[];
  initialValues?: ProductCategory;
};

export function CategoryFormPanel({ panelProps }: PanelComponentProps) {
  const { categories, initialValues } = (panelProps || {}) as CategoryFormPanelProps;

  return <UpdateCategoryForm categories={categories || []} initialValues={initialValues} />;
}
