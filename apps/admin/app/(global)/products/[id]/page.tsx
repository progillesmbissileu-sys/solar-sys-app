import { getProduct } from '@/entities/product';
import { FailedRequestDisplay } from '@/shared/ui';
import { ProductDetailsView } from '@/views/product';

import { AppRouterProps } from '../../../_lib';

export default async function Page({ params }: AppRouterProps) {
  const { id } = await params;

  const resp = await getProduct(id);
  return resp.success ? (
    <ProductDetailsView product={resp.data.data} />
  ) : (
    <FailedRequestDisplay status={resp.error.status} />
  );
}
