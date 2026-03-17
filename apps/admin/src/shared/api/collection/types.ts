export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl?: string;
  previousPageUrl?: string;
}

export type CollectionResponseType<
  TData,
  TMeta = {
    pagination?: PaginationMeta;
    filter?: FilterParams;
    sort?: SortParams;
  },
> = {
  data: TData[];
  meta: TMeta;
};

export type Pagination = {
  total?: number;
  page: number;
  limit: number;
};

export type FilterParams = {
  [key: string]: string | number | boolean | string[] | number[] | boolean[];
};

export type SortItem = {
  field: string;
  order: 'asc' | 'desc';
};

export type SortParams = {
  sort?: SortItem[];
};

export type CollectionQueryParams = {
  q?: string;
} & Pagination & {
    filter?: FilterParams;
    sort?: SortItem[];
  };
