import { BreadcrumbSegment } from '../model/breadcrumb-store';
import { RightPanelType } from '../model/right-panel-store';

export type PageContainerProps = {
  children: React.ReactNode;

  pageHeader?: {
    title: string;
    actions?: React.ReactNode;
  };
  breadcrumbs?: BreadcrumbSegment[];
  rightPanel?: {
    panelType?: RightPanelType;
    panelProps?: Record<string, unknown>;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  };
};
