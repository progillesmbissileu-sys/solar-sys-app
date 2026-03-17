import { productCategoryCollection, productCollection } from '@/entities/product';
import { ProductCollectionView } from '@/views/product';
import { FailedRequestDisplay, SomethingWentWrong } from '@/shared/ui';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams: any }) {
  const query = await searchParams;

  const response = await productCollection({
    page: query.page || 1,
    limit: query.limit || 10,
    q: query.q,
  });

  return (
    <>
      {response.success ? (
        <ProductCollectionView
          collection={response.data}
          categories={productCategoryCollection()}
        />
      ) : (
        <FailedRequestDisplay status={response.error.status} />
      )}
    </>
  );
}
