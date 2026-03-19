'use client';

import { AppImage, Button, DateDisplay, Label } from '@/shared/ui';
import { CollectionManager } from '@/widgets/collection';
import { CollectionResponseType } from '@/shared/api';
import { DesktopPageContainer, useRightPanel } from '@/widgets/container';
import { RiBox1Line } from '@remixicon/react';
import { MarketServiceCollectionItem } from '@/entities/market-service';
import _ from 'lodash';
import { routePaths } from '@/shared/routes';
import { useNavigator } from '@/shared/lib';

export function MarketServiceListView({
  collectionData: collection,
}: {
  collectionData: CollectionResponseType<MarketServiceCollectionItem>;
}) {
  const { openPanel } = useRightPanel();
  const navigator = useNavigator();

  return (
    <DesktopPageContainer
      breadcrumbs={[
        { label: 'Acceuil', href: '/' },
        { label: 'Services', href: routePaths.MARKET_SERVICES },
      ]}
      pageHeader={{
        title: 'marketService.pageTitle',
        actions: (
          <div>
            <Button
              className="cursor-pointer gap-x-2"
              onClick={() => {
                openPanel('MARKET_SERVICE_FORM', {
                  title: 'Nouveau service',
                  width: '40vw',
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
      <CollectionManager<MarketServiceCollectionItem>
        columns={[
          {
            key: 'thumbnail',
            title: '',
            render: (record) => (
              <AppImage
                src={record.thumbnailUrl}
                alt={record.designation}
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
            key: 'description',
            title: 'common.shortDescription',
            render: (record) => _.truncate(record.shortDescription, { length: 50 }),
          },
          {
            key: 'added',
            title: 'common.addedAt',
            align: 'end',
            render: (record) => <DateDisplay date={record.createdAt} />,
          },
          {
            key: 'updated',
            title: 'common.lastUpdated',
            align: 'end',
            render: (record) => <DateDisplay date={record.updatedAt} />,
          },
        ]}
        collection={collection}
        onRowClick={(record) =>
          navigator.navigate(routePaths.MARKET_SERVICES_DETAILS, { id: record.id })
        }
      />
    </DesktopPageContainer>
  );
}
