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
      <header className="content-center border-b px-5 xl:h-16">
        <h1 className="font-semibold text-dark/60 xl:text-2xl">
          {initialValues?.id ? 'Modifier une catégorie' : 'Ajouter une catégorie'}
        </h1>
      </header>
      <main className="content-center p-5 xl:h-[calc(100%-64px)]">
        <div className="mx-auto my-auto xl:w-full">
          <UpdateCategoryForm categories={categories || []} initialValues={initialValues} />
        </div>
      </main>
    </div>
  );
}
