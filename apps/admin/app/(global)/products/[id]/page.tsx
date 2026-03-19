import { getProduct } from '@/entities/product';
import { AppRouterProps } from '../../../_lib';
import { ProductDetailsView } from '@/views/product';
import { FailedRequestDisplay } from '@/shared/ui';

export default async function Page({ params }: AppRouterProps) {
  const { id } = await params;

  const resp = await getProduct(id);
  return resp.success ? (
    <ProductDetailsView product={resp.data.data} />
  ) : (
    <FailedRequestDisplay status={resp.error.status} />
  );
}
