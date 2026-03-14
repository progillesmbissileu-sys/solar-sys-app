'use client';

import { ProductCategoryPreview } from '@/entities/product';
import { Button, DateDisplay, Label } from '@/shared/ui';
import { CollectionManager } from '@/widgets/collection';
import { CollectionResponseType } from '@/shared/api';
import { DesktopPageContainer, useRightPanel } from '@/widgets/container';
import { RiBox1Line } from '@remixicon/react';
import { useNavigator } from '@/shared/lib';
import { routePaths } from '@/shared/routes';

export function CategoryCollectionView({
  collection,
}: {
  collection: CollectionResponseType<ProductCategoryPreview>;
}) {
  const navigator = useNavigator();
  const { openPanel } = useRightPanel();

  return (
    <DesktopPageContainer
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Categories', href: routePaths.PRODUCTS_CATEGORIES },
      ]}
      pageHeader={{
        title: 'product.pageTitle.category',
        actions: (
          <div>
            <Button
              className="cursor-pointer gap-x-2"
              onClick={() =>
                openPanel('CATEGORY_FORM', {
                  title: 'Nouvelle catégorie',
                })
              }
            >
              <RiBox1Line className="size-5 text-white/90" />
              <Label className="cursor-pointer text-white/90">action.new</Label>
            </Button>
          </div>
        ),
      }}
    >
      <CollectionManager<ProductCategoryPreview>
        columns={[
          {
            key: 'name',
            title: 'common.designation',
            dataIndex: 'designation',
          },
          {
            key: 'type',
            title: 'common.type',
            dataIndex: 'type',
          },
          {
            key: 'added',
            title: 'common.addedAt',
            align: 'end',
            render: (product) => <DateDisplay date={product.createdAt} />,
          },
          {
            key: 'updated',
            title: 'common.updatedAt',
            align: 'end',
            render: (product) => <DateDisplay date={product.updatedAt} />,
          },
        ]}
        collection={collection}
        onRowClick={(record) =>
          navigator.navigate(routePaths.PRODUCTS_CATEGORIES_VIEW, {
            id: record.id,
          })
        }
      />
    </DesktopPageContainer>
  );
}
