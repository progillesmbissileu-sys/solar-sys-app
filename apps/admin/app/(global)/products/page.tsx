import { ProductManagementView } from '@/modules/product';
import { productCategoryCollection, productCollection } from '@/entities/product';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams: any }) {
  const query = await searchParams;

  const collection = await productCollection(undefined, {
    page: query.page || 1,
    limit: query.limit || 10,
    q: query.q,
  });

  const categories = productCategoryCollection();

  return (
    <Suspense>
      {
        <ProductManagementView
          collection={{
            ...(collection ?? {}),
            data: (collection?.data ?? []).map((item) => ({
              id: item.id,
              thumbnailUrl: item.mainImageUrl,
              designation: item.designation,
              price: item.price,
              brand: item.brand,
              categoryName: item.categoryName,
              categoryId: item.categoryId,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
            })),
          }}
          categories={categories}
        />
      }
    </Suspense>
  );
}
