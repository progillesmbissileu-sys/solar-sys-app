export { DesktopPageContainer } from './ui/DesktopPageContainer';
export { TabNavigationContainer } from './ui/TabNavigationContainer';

//HOOK
export { useBreadcrumbs } from './lib/use-breadcrumbs';

// Store
export { useRightPanel } from './lib/use-right-panel';
export type {
  RightPanelActions,
  RightPanelState,
  RightPanelStoreType,
  RightPanelType,
} from './model/right-panel-store';
export { useRightPanelStore } from './model/right-panel-store';

// Panel Registry
export type { PanelComponentProps,PanelRegistryConfig } from './model/panel-registry';
export { PanelRegistryProvider, usePanelComponent, usePanelRegistry } from './model/panel-registry';
