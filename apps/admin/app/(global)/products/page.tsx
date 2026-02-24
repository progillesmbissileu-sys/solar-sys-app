import { ProductManagementView } from "@/modules/product"
import { productCollection } from "@/entities/product"

export default async function Page({ searchParams }: { searchParams: any }) {
  const query = await searchParams

  const collection = await productCollection(undefined, {
    page: query.page || 1,
    limit: query.limit || 10,
    q: query.q,
  })

  return <ProductManagementView collection={collection} />
}
