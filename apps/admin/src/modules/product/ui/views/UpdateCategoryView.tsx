import {
  getProductCategory,
  productCategoryCollection,
} from "@/entities/product"
import UpdateCategoryForm from "../forms/UpdateCategoryForm"

export default async function UpdateCategoryView({
  categoryId,
}: {
  categoryId?: string
}) {
  let initialValues

  const categories = await productCategoryCollection()

  if (categoryId) {
    initialValues = await getProductCategory(categoryId)
  }

  return (
    <div>
      <header className="border-b p-5">
        <h1 className="font-semibold text-dark/60 xl:text-2xl">
          {categoryId ? "Modifier une catégorie" : "Ajouter une catégorie"}
        </h1>
      </header>
      <main className="p-5">
        <UpdateCategoryForm
          categories={categories.data}
          initialValues={initialValues?.data}
        />
      </main>
    </div>
  )
}
