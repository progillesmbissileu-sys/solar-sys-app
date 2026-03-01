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

  return (
    <div className="h-full">
      <header className="border-b border-dashed xl:pb-2.5">
        <h1 className="font-semibold text-dark/60 xl:text-xl">
          {initialValues?.id ? 'Modifier une catégorie' : 'Créer catégorie'}
        </h1>
      </header>
      <main className="content-center xl:py-[30px]">
        <div className="mx-auto my-auto xl:w-full">
          <UpdateCategoryForm categories={categories || []} initialValues={initialValues} />
        </div>
      </main>
    </div>
  );
}
