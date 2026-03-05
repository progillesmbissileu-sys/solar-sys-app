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

export type CollectionResponseType<TData> = {
  data: TData[];
  meta: {
    pagination?: Pagination;
    filter?: FilterParams;
    sort?: SortParams;
  };
};

export type Pagination = {
  total?: number;
  page: number;
  limit: number;
};

export type FilterParams = {
  [key: string]: string | number | boolean | string[] | number[] | boolean[];
};

export type SortParams = {
  [key: string]: 'asc' | 'desc';
};

export type CollectionQueryParams = Pagination & FilterParams & SortParams & { q?: string };
