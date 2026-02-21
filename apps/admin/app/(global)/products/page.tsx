import { ProductManagementView } from "@/modules/product"
import { productCollection } from "@/entities/product"

export default async function Page() {
  const products = await productCollection()

  return <ProductManagementView productItems={products.data} />
}
