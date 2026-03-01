'use client';

import { ProductCategoryPreview } from '@/entities/product';
import DateDisplay from '@/shared/ui/molecules/DateDisplay';
import { CollectionManager } from '@/widgets/collection';
import { CollectionResponseType } from '@/shared/api';
import {
  DesktopPageContainer,
  useRightPanelStore,
  PanelRegistryProvider,
} from '@/widgets/container';
import { Button } from '@/shared/ui/atoms/Button';
import { Label } from '@/shared/ui/atoms/Label';
import { RiBox1Line } from '@remixicon/react';
import { useNavigator } from '@/shared/lib/router';
import { routePaths } from '@/shared/routes';
import { PANEL_TYPES, panelRegistry } from '../../config/registry';

export default function ProductCategoriesView({
  collection,
}: {
  collection: CollectionResponseType<ProductCategoryPreview>;
}) {
  const navigator = useNavigator();
  const openPanel = useRightPanelStore((state) => state.openPanel);

  const handleOpenCategoryForm = () => {
    openPanel(PANEL_TYPES.CATEGORY_FORM);
  };

  return (
    <PanelRegistryProvider panels={panelRegistry}>
      <DesktopPageContainer
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: routePaths.PRODUCTS_CATEGORIES },
        ]}
        pageHeader={{
          title: 'product.pageTitle.category',
          actions: (
            <div>
              <Button className="cursor-pointer gap-x-2" onClick={handleOpenCategoryForm}>
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
    </PanelRegistryProvider>
  );
}
