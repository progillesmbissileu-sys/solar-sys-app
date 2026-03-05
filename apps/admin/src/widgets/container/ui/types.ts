import { BreadcrumbSegment } from '../model/breadcrumb-store';
import { RightPanelType } from '../model/right-panel-store';

export type TabItem = {
  key: string;
  label: string;
};

export type PageContainerProps = {
  children: React.ReactNode;

  pageHeader?: {
    title: string;
    actions?: React.ReactNode;
  };
  breadcrumbs?: BreadcrumbSegment[];
  tabs?: TabItem[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  rightPanel?: {
    panelType?: RightPanelType;
    panelProps?: Record<string, unknown>;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  };
};

export type TabNavigationContainerProps = {
  children: React.ReactNode;
  navigation: {
    title: string;
    href: string;
  }[];
  pathname: string;
};
