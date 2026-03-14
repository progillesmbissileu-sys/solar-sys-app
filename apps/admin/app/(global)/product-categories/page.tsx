import { productCategoryCollection } from '@/entities/product';
import { CategoryCollectionView } from '@/views/product';

export default async function Page() {
  const response = await productCategoryCollection();

  return <CategoryCollectionView collection={response} />;
}
