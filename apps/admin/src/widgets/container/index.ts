export { DesktopPageContainer } from './ui/DesktopPageContainer';

//HOOK
export { useBreadcrumbs } from './lib/use-breadcrumbs';

// Store
export { useRightPanelStore } from './model/right-panel-store';
export type {
  RightPanelStoreType,
  RightPanelState,
  RightPanelActions,
  RightPanelType,
} from './model/right-panel-store';

// Panel Registry
export { PanelRegistryProvider, usePanelComponent, usePanelRegistry } from './model/panel-registry';
export type { PanelRegistryConfig, PanelComponentProps } from './model/panel-registry';
