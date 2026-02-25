import {
  getProductCategory,
  productCategoryCollection,
} from "@/entities/product"
import { UpdateCategoryView } from "@/modules/product"

export default async function Page({ params }: { params: any }) {
  const _params = await params

  const categories = await productCategoryCollection()

  const initialValues = await getProductCategory(_params.id)

  return (
    <UpdateCategoryView
      categories={categories.data}
      initialValues={initialValues?.data}
    />
  )
}
