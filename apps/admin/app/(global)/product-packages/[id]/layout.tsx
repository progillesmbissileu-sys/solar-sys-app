'use client';

import { productPackManageTabs } from '@/views/product';
import { TabNavigationContainer } from '@/widgets/container';
import { useParams, usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const params = useParams<{ id: string }>();

  return (
    <TabNavigationContainer navigation={productPackManageTabs(params.id)} pathname={pathname}>
      {children}
    </TabNavigationContainer>
  );
}
