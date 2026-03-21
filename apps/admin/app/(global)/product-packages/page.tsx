import { productPackCollection } from '@/entities/product';
import { FailedRequestDisplay } from '@/shared/ui';
import { ProductPackCollectionView } from '@/views/product';

export default async function Page({ searchParams }: { searchParams: any }) {
  const query = await searchParams;

  const response = await productPackCollection({
    page: query.page || 1,
    limit: query.limit || 10,
    q: query.q,
  });

  return (
    <>
      {response.success ? (
        <ProductPackCollectionView collection={response.data} />
      ) : (
        <FailedRequestDisplay status={response.error.status} />
      )}
    </>
  );
}
