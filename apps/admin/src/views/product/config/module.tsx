import { PackageSearch } from 'lucide-react';

import { AppModuleConfig } from '@/shared/config';
import { routePaths } from '@/shared/routes';

import { CategoryFormPanel } from '../ui/panels/CategoryFormPanel';
import { ProductPackageFormPanel } from '../ui/panels/PackageFormPanel';
import { ProductFormPanel } from '../ui/panels/ProductFormPanel';

export const productModuleConfig: AppModuleConfig = {
  icon: PackageSearch,
  key: 'product',
  path: routePaths.PRODUCTS,
  title: 'product.menuTitle',
  children: [
    {
      key: 'product.management',
      title: 'product.list',
      path: routePaths.PRODUCTS_MANAGEMENT,
    },
    {
      key: 'product.packages',
      title: 'product.packages',
      path: routePaths.PRODUCTS_PACKAGES,
    },
    {
      key: 'product.category',
      title: 'product.categories',
      path: routePaths.PRODUCTS_CATEGORIES,
    },
  ],
};

export const productModulePanels = {
  CATEGORY_FORM: CategoryFormPanel,
  PRODUCT_FORM: ProductFormPanel,
  PRODUCT_PACKAGE_FORM: ProductPackageFormPanel,
};
