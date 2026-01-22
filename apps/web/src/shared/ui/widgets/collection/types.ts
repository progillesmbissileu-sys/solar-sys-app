import React from "react";

export type CollectionFilterType = {
  label: string;
  items: Array<{
    label: string;
    value: string;
  }>;
};

export type CollectionBrowserWidgetProps<T> = {
  collection: (params?: any) => Promise<any>;
  renderItem: (item: T, index?: number) => React.ReactNode;
  groupFilters?: Array<{ groupTitle: string; groupItems: CollectionFilterType[] }>;
};
