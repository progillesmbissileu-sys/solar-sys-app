import { ProductManagementView } from "@/modules/product"
import { productCollection } from "@/entities/product/api"

export default async function Page() {
  const products = await productCollection()

  console.log("PRODUCTS LIST:- ", products)

  return <ProductManagementView />
}
