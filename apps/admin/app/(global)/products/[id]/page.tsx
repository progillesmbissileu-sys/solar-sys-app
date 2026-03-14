import { getProduct } from '@/entities/product';
import { RouteLayoutProps } from '../../../_lib';
import { ResourceNotFound } from '../../../_ui/ResourceNotFound';
import { ProductDetailsView } from '@/views/product';

export default async function Page({ params }: RouteLayoutProps) {
  const { id } = await params;

  const resp = await getProduct(id);
  return resp.success ? <ProductDetailsView product={resp.data.data} /> : <ResourceNotFound />;
}
