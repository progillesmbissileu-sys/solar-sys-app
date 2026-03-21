'use client';

import { useEffect, useState } from 'react';

import {
  BreadcrumbSegment,
  BreadcrumbStoreType,
  useBreadcrumbStore,
} from '../model/breadcrumb-store';

export function useBreadcrumbs(slot?: string) {
  const state = useBreadcrumbStore((state: BreadcrumbStoreType) => state);
  const [segments, setSegments] = useState<{
    key?: string;
    segments?: BreadcrumbSegment[];
  }>();

  useEffect(() => {
    slot && setSegments({ key: slot, segments: state.breadcrumbs[slot] });
  }, [state.breadcrumbs]);

  return { setBreadcrumbs: state.update, breadcrumbs: segments };
}
