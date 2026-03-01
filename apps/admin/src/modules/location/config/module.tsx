import { AppModuleConfig } from '@/shared/config';
import { routePaths } from '@/shared/routes';
import { StoreIcon } from 'lucide-react';

export const locationModuleConfig: AppModuleConfig = {
  icon: StoreIcon,
  key: 'location',
  path: routePaths.LOCATIONS,
  title: 'location.menuTitle',
  // children: [],
};
