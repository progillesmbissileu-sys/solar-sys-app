import { productCategoryCollection } from '@/entities/product';
import { CategoryCollectionView } from '@/modules/product';

export default async function Page() {
  const response = await productCategoryCollection();

  return <CategoryCollectionView collection={response} />;
}
