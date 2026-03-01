import { productCategoryCollection } from '@/entities/product';
import { ProductCategoriesView } from '@/modules/product';

export default async function Page({ searchParams }: { searchParams: any }) {
  const query = await searchParams;

  const collection = await productCategoryCollection(undefined, {
    page: query.page || 1,
    limit: query.limit || 10,
    q: query.q,
  });

  return <ProductCategoriesView collection={collection} />;
}
