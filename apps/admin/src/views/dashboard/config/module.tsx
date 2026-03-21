import { LayoutDashboard } from 'lucide-react';

import { AppModuleConfig } from '@/shared/config';
import { routePaths } from '@/shared/routes';

export const dashboardModuleConfig: AppModuleConfig = {
  icon: LayoutDashboard,
  key: 'dashboard',
  path: routePaths.DASHBOARD,
  title: 'dashboard.menuTitle',
};
