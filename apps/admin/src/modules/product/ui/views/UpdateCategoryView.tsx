"use client"

import { ProductCategory } from "@/entities/product"
import UpdateCategoryForm from "../forms/UpdateCategoryForm"

export default function UpdateCategoryView({
  categories,
  initialValues,
}: {
  categories: ProductCategory[]
  initialValues?: ProductCategory
}) {
  return (
    <div>
      <header className="border-b p-5">
        <h1 className="font-semibold text-dark/60 xl:text-2xl">
          {initialValues?.id
            ? "Modifier une catégorie"
            : "Ajouter une catégorie"}
        </h1>
      </header>
      <main className="p-5">
        <UpdateCategoryForm
          categories={categories}
          initialValues={initialValues}
        />
      </main>
    </div>
  )
}
