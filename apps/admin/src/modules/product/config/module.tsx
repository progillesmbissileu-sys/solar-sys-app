import { AppModuleConfig } from '@/shared/config';
import { routePaths } from '@/shared/routes';
import { PackageSearch } from 'lucide-react';
import { CategoryFormPanel } from '../ui/panels/CategoryFormPanel';
import { ProductFormPanel } from '../ui/panels/ProductFormPanel';

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

export const productModulePanels = {
  CATEGORY_FORM: CategoryFormPanel,
  PRODUCT_FORM: ProductFormPanel,
};
