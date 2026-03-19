import { getProductPack } from '@/entities/product';
import { AppRouterProps } from '../../../_lib';
import { FailedRequestDisplay } from '@/shared/ui';
import { ProductPackDetailsView } from '@/views/product/ui/ProductPackDetailsView';

export default async function Page({ params }: AppRouterProps) {
  const { id } = await params;

  const resp = await getProductPack(id);

  return resp.success ? (
    <ProductPackDetailsView productPackage={resp.data.data} />
  ) : (
    <FailedRequestDisplay status={resp.error.status} />
  );
}
