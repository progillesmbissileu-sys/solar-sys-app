import { marketServiceCollection } from '@/entities/market-service';
import { FailedRequestDisplay } from '@/shared/ui';
import { MarketServiceListView } from '@/views/market-services';

export default async function Page({ searchParams }: { searchParams: any }) {
  const params = await searchParams;

  const response = await marketServiceCollection({
    page: params.page || 1,
    limit: params.limit || 10,
    q: params.q,
  });

  return (
    <>
      {response.success ? (
        <MarketServiceListView collectionData={response.data} />
      ) : (
        <FailedRequestDisplay status={response.error.status} />
      )}
    </>
  );
}
