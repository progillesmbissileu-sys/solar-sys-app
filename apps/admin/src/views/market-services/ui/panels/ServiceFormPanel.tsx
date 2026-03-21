'use client';

import { MarketService } from '@/entities/market-service';
import { MarketServiceForm } from '@/features/market-services';
import { PanelComponentProps } from '@/widgets/container';

export type FormPanelProps = {
  initialValues?: Partial<MarketService>;
};

export function MarketServiceFormPanel({ panelProps }: PanelComponentProps) {
  const { initialValues } = (panelProps || {}) as FormPanelProps;

  return <MarketServiceForm initialValues={initialValues} />;
}
