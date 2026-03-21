'use client';

import { Product } from '@/entities/product';
import { ProductPackageForm } from '@/features/products';
import { PanelComponentProps } from '@/widgets/container';

export type ProductPackageFormPanelProps = {
  initialValues?: Partial<Product>;
};

export function ProductPackageFormPanel({ panelProps }: PanelComponentProps) {
  const { initialValues } = (panelProps || {}) as ProductPackageFormPanelProps;

  return <ProductPackageForm initialValues={initialValues as any} />;
}
