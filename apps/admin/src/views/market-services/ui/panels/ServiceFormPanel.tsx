'use client';

import { PanelComponentProps } from '@/widgets/container';
import { MarketServiceForm } from '@/features/market-services';
import { MarketService } from '@/entities/market-service';

export type FormPanelProps = {
  initialValues?: Partial<MarketService>;
};

export function MarketServiceFormPanel({ panelProps }: PanelComponentProps) {
  const { initialValues } = (panelProps || {}) as FormPanelProps;

  return <MarketServiceForm initialValues={initialValues} />;
}
