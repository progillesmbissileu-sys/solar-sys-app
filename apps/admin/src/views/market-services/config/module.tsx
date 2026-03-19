import { AppModuleConfig } from '@/shared/config';
import { routePaths } from '@/shared/routes';
import { PackageSearch } from 'lucide-react';
import { MarketServiceFormPanel } from '../ui/panels/ServiceFormPanel';

export const marketServiceModuleConfig: AppModuleConfig = {
  icon: PackageSearch,
  key: 'services',
  path: routePaths.MARKET_SERVICES,
  title: 'services.menuTitle',
  children: [
    {
      key: 'services.management',
      title: 'services.list',
      path: routePaths.MARKET_SERVICES,
    },
  ],
};

export const marketServiceModulePanels = {
  MARKET_SERVICE_FORM: MarketServiceFormPanel,
};
