import { productPackCollection } from '@/entities/product';
import { ProductPackCollectionView } from '@/views/product';
import { Suspense } from 'react';
import { SomethingWentWrong } from '@/shared/ui';

export default async function Page({ searchParams }: { searchParams: any }) {
  const query = await searchParams;

  const response = await productPackCollection({
    page: query.page || 1,
    limit: query.limit || 10,
    q: query.q,
  });

  return (
    <Suspense>
      {response.success ? (
        <ProductPackCollectionView collection={response.data} />
      ) : (
        <SomethingWentWrong />
      )}
    </Suspense>
  );
}
