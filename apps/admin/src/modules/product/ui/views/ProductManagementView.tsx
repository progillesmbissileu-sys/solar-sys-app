'use client';

import { ProductPreview } from '@/entities/product';
import { PriceDisplay } from '@/shared/ui/molecules';
import DateDisplay from '@/shared/ui/molecules/DateDisplay';
import { CollectionManager } from '@/widgets/collection';
import { CollectionResponseType } from '@/shared/api';
import { DesktopPageContainer } from '@/widgets/container';
import { Button } from '@/shared/ui/atoms/Button';
import { Label } from '@/shared/ui/atoms/Label';
import { RiBox1Line } from '@remixicon/react';

export default function ProductManagementView({
  collection,
}: {
  collection: CollectionResponseType<ProductPreview>;
}) {
  return (
    <DesktopPageContainer
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
      ]}
      pageHeader={{
        title: 'product.pageTitle',
        actions: (
          <div>
            <Button className="cursor-pointer gap-x-2">
              <RiBox1Line className="size-5 text-white/90" />
              <Label className="cursor-pointer text-white/90">action.new</Label>
            </Button>
          </div>
        ),
      }}
    >
      <CollectionManager<ProductPreview>
        columns={[
          {
            key: 'name',
            title: 'common.designation',
            dataIndex: 'designation',
          },
          {
            key: 'price',
            title: 'common.price',
            align: 'end',
            render: (product) => <PriceDisplay amount={product.price} />,
          },
          {
            key: 'category',
            title: 'common.category',
            dataIndex: 'categoryName',
          },
          {
            key: 'date',
            title: 'common.addedAt',
            align: 'end',
            render: (product) => <DateDisplay date={product.createdAt} />,
          },
        ]}
        collection={collection}
      />
    </DesktopPageContainer>
  );
}
