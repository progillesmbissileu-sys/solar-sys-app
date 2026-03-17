import { getProduct } from '@/entities/product';
import { RouteLayoutProps } from '../../../_lib';
import { ProductDetailsView } from '@/views/product';
import { FailedRequestDisplay } from '@/shared/ui';

export default async function Page({ params }: RouteLayoutProps) {
  const { id } = await params;

  const resp = await getProduct(id);
  return resp.success ? (
    <ProductDetailsView product={resp.data.data} />
  ) : (
    <FailedRequestDisplay status={resp.error.status} />
  );
}
