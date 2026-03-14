import { productCategoryCollection, productCollection } from '@/entities/product';
import { ProductCollectionView } from '@/views/product';
import { SomethingWentWrong } from '@/shared/ui';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams: any }) {
  const query = await searchParams;

  const response = await productCollection({
    page: query.page || 1,
    limit: query.limit || 10,
    q: query.q,
  });

  const categories = productCategoryCollection();

  return (
    <Suspense>
      {response.success ? (
        <ProductCollectionView collection={response.data} categories={categories} />
      ) : (
        <SomethingWentWrong />
      )}
    </Suspense>
  );
}
