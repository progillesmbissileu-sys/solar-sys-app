import { productCategoryCollection } from '@/entities/product';
import { UpdateCategoryView } from '@/modules/product';

export default async function Page() {
  const categories = await productCategoryCollection();

  return <UpdateCategoryView categories={categories.data} />;
}
