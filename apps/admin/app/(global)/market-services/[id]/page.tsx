import { marketServiceDetail } from '@/entities/market-service';
import { FailedRequestDisplay } from '@/shared/ui';
import { MarketServiceDetailsView } from '@/views/market-services';

import { AppRouterProps } from '../../../_lib';

export default async function Page({ params }: AppRouterProps) {
  const { id } = await params;

  const response = await marketServiceDetail(id);

  return response.success ? (
    <MarketServiceDetailsView service={response.data.data} />
  ) : (
    <FailedRequestDisplay status={response.error.status} />
  );
}
