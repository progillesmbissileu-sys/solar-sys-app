'use client';

import { AppTable } from '@/shared/ui/organisms/AppTable';
import type { ColumnType } from '@/shared/ui/organisms/AppTable/types';
import type { CollectionResponseType } from '@/shared/api';
import { Controls, type FilterConfig } from './Controls';
import { cx } from '@/shared/lib/utils';

export type CollectionManagerProps<TData> = {
  collection: CollectionResponseType<TData>;
  columns: Array<ColumnType<TData>>;
  title?: string;
  searchKey?: string;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  className?: string;
  onRowClick?: (record: TData) => void;
};

export default function CollectionManager<TData>({
  collection,
  columns,
  title,
  searchKey,
  searchPlaceholder,
  filters,
  className,
  ...props
}: CollectionManagerProps<TData>) {
  const dataSource = collection?.data ?? [];

  return (
    <section className={cx('grid', className)}>
      <header className="p-3">
        <Controls searchKey={searchKey} searchPlaceholder={searchPlaceholder} filters={filters} />
      </header>

      <div>
        <AppTable<TData>
          columns={columns}
          dataSource={dataSource as any}
          onRowSelection={props.onRowClick}
        />
      </div>
    </section>
  );
}
