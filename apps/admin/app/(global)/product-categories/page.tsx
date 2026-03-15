import { productCategoryCollection } from '@/entities/product';
import { SomethingWentWrong } from '@/shared/ui';
import { CategoryCollectionView } from '@/views/product';

export default async function Page() {
  const response = await productCategoryCollection();

  return (
    <>
      {response.success ? (
        <CategoryCollectionView collection={response.data} />
      ) : (
        <SomethingWentWrong />
      )}
    </>
  );
}
