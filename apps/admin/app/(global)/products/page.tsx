import { ProductManagementView } from "@/modules/product"
import { productCollection } from "@/entities/product"

export default async function Page() {
  const collection = await productCollection()

  // console.log(collection)

  return <ProductManagementView collection={collection} />
}
