import { getProduct } from '@/entities/product';
import { ProductUpdateForm } from '@/views/product';
import { RouteLayoutProps } from '../../../../_lib';
import { ResourceNotFound } from '../../../../_ui/ResourceNotFound';
import { productCategoryCollection } from '@/entities/product';
import { ProductUpdateFormValues } from '@/views/product';

export default async function EditPage({ params }: RouteLayoutProps) {
  const { id } = await params;

  const resp = await getProduct(id);
  if (!resp.success) {
    return <ResourceNotFound />;
  }

  const product = resp.data.data;

  // Fetch categories for the select dropdown
  const categoriesResp = await productCategoryCollection();
  const categories = categoriesResp?.data ?? [];

  const initialValues: ProductUpdateFormValues = {
    id: product.id,
    designation: product.designation,
    description: product.description,
    price: product.price,
    categoryId: product.category.id,
    brand: product.brand ?? '',
  };

  return (
    <div className="w-full p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Edit Product
        </h1>
        <ProductUpdateForm initialValues={initialValues} categories={categories} />
      </div>
    </div>
  );
}
