import { productCategoryCollection, productCollection } from '@/entities/product';
import { FailedRequestDisplay } from '@/shared/ui';
import { ProductCollectionView } from '@/views/product';

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
        <ProductCollectionView collection={response.data} />
      ) : (
        <FailedRequestDisplay status={response.error.status} />
      )}
    </>
  );
}
