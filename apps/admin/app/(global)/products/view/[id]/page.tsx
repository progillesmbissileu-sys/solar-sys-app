import { getProduct, productCategoryCollection } from '@/entities/product';
import ProductForm from '@/modules/product/ui/forms/ProductForm';
import { updateProductAction } from '@/modules/product/api/product-actions';

export default async function Page({ params }: { params: any }) {
  const _params = await params;

  const categories = await productCategoryCollection();
  const initial = await getProduct(_params.id);

  return (
    <ProductForm
      categories={categories.data}
      initialValues={initial?.data}
      serverAction={updateProductAction}
    />
  );
}

