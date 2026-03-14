import { TabNavigationContainerProps } from '@/widgets/container/ui/types';

export const productManageTabs = (productId: string) => [
  { title: 'Overview', href: `/products/${productId}` },
  { title: 'Orders', href: `/products/${productId}/orders-history` },
  { title: 'Inventory', href: `/products/${productId}/inventory` },
];
