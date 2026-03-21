'use client';

import { PanelComponentProps } from '@/widgets/container';
import { ProductCategory } from '@/entities/product';
import { UpdateCategoryForm } from '@/features/products';

export type CategoryFormPanelProps = {
  initialValues?: ProductCategory;
};

export function CategoryFormPanel({ panelProps }: PanelComponentProps) {
  const { initialValues } = (panelProps || {}) as CategoryFormPanelProps;

  return <UpdateCategoryForm initialValues={initialValues} />;
}
