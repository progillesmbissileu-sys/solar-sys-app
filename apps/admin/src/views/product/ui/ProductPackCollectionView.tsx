'use client';

import { ProductPackCollectionPreview } from '@/entities/product';
import { AppImage, Button, DateDisplay, Label, PriceDisplay } from '@/shared/ui';
import { CollectionManager } from '@/widgets/collection';
import { CollectionResponseType } from '@/shared/api';
import { DesktopPageContainer, useRightPanel } from '@/widgets/container';
import { RiBox1Line } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { routePaths } from '@/shared/routes';
import { useNavigator } from '@/shared/lib';

export function ProductPackCollectionView({
  collection,
}: {
  collection: CollectionResponseType<ProductPackCollectionPreview>;
}) {
  const { openPanel } = useRightPanel();
  const navigator = useNavigator();

  return (
    <DesktopPageContainer
      breadcrumbs={[
        { label: 'Acceuil', href: '/' },
        { label: 'Packages', href: routePaths.PRODUCTS_PACKAGES },
      ]}
      pageHeader={{
        title: 'product.pageTitle',
        actions: (
          <div>
            <Button
              className="cursor-pointer gap-x-2"
              onClick={() => {
                openPanel('PRODUCT_PACKAGE_FORM', {
                  title: 'Nouveau package',
                  width: '50vw',
                });
              }}
            >
              <RiBox1Line className="size-5 text-white/90" />
              <Label className="cursor-pointer text-white/90">Nouveau</Label>
            </Button>
          </div>
        ),
      }}
    >
      <CollectionManager<ProductPackCollectionPreview>
        columns={[
          {
            key: 'thumbnail',
            title: '',
            render: (pack) => (
              <AppImage
                src={pack.mainImageUrl}
                alt={pack.designation}
                title={pack.designation}
                width={40}
                height={40}
                unoptimized
              />
            ),
          },
          {
            key: 'name',
            title: 'common.designation',
            dataIndex: 'designation',
          },
          {
            key: 'price',
            title: 'common.price',
            align: 'end',
            render: (pack) => <PriceDisplay amount={pack.price} />,
          },
          {
            key: 'count',
            title: 'common.countItems',
            align: 'center',
            render: (pack) => pack.items.length,
          },
          {
            key: 'created',
            title: 'common.createdAt',
            align: 'end',
            render: (pack) => <DateDisplay date={pack.createdAt} />,
          },
          {
            key: 'updated',
            title: 'common.lastUpdated',
            align: 'end',
            render: (pack) => <DateDisplay date={pack.updatedAt} />,
          },
        ]}
        collection={collection}
        onRowClick={(record) =>
          navigator.navigate(routePaths.PRODUCTS_PACKAGES_DETAILS, { id: record.id })
        }
      />
    </DesktopPageContainer>
  );
}
