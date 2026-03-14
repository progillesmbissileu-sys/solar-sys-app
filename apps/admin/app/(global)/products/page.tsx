import { productCategoryCollection, productCollection } from '@/entities/product';
import { ProductCollectionView } from '@/views/product';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams: any }) {
  const query = await searchParams;

  const collection = await productCollection(undefined, {
    page: query.page || 1,
    limit: query.limit || 10,
    q: query.q,
  });

  const categories = productCategoryCollection();

  return (
    <Suspense>{<ProductCollectionView collection={collection} categories={categories} />}</Suspense>
  );
}
