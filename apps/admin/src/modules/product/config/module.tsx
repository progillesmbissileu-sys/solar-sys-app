import { AppModuleConfig } from '@/shared/config';
import { routePaths } from '@/shared/routes';
import { PackageSearch } from 'lucide-react';

export const productModuleConfig: AppModuleConfig = {
  icon: PackageSearch,
  key: 'product',
  path: routePaths.PRODUCTS,
  title: 'product.menuTitle',
  children: [
    {
      key: 'product.management',
      title: 'product.management',
      path: routePaths.PRODUCTS_MANAGEMENT,
    },
    {
      key: 'product.category',
      title: 'product.categoryManagement',
      path: routePaths.PRODUCTS_CATEGORIES,
    },
  ],
};
