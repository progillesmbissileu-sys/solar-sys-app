import { CollectionQueryParams, FilterParams,SortItem } from './types';

export class CollectionHelpers {
  static paramsToQueryString(params?: CollectionQueryParams): string {
    if (!params) return '';

    const query = new URLSearchParams();

    if (params.q) query.set('q', params.q);

    if (params.page) query.set('page', params.page.toString());

    if (params.limit) query.set('limit', params.limit.toString());

    if (params.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        query.set(`${key}`, JSON.stringify(value));
      });
    }

    if (params.sort) {
      params.sort.forEach((item, index) => {
        query.set(`sort[${index}][field]`, item.field);
        query.set(`sort[${index}][order]`, item.order);
      });
    }

    return query.toString();
  }

  static queryStringToParams(queryString: string): CollectionQueryParams {
    const params = new URLSearchParams(queryString);
    const result: CollectionQueryParams = {
      page: 1,
      limit: 10,
    };

    // Parse simple values
    const q = params.get('q');
    if (q) result.q = q;

    const page = params.get('page');
    if (page) result.page = parseInt(page, 10);

    const limit = params.get('limit');
    if (limit) result.limit = parseInt(limit, 10);

    // Parse sort array
    const sortItems: SortItem[] = [];
    let sortIndex = 0;

    while (params.has(`sort[${sortIndex}][field]`)) {
      const field = params.get(`sort[${sortIndex}][field]`);
      const order = params.get(`sort[${sortIndex}][order]`);

      if (field && order) {
        sortItems.push({ field, order: order as 'asc' | 'desc' });
      }
      sortIndex++;
    }

    if (sortItems.length > 0) {
      result.sort = sortItems;
    }

    // Parse filter params (exclude known params)
    const knownParams = ['q', 'page', 'limit'];
    const filter: FilterParams = {};

    params.forEach((value, key) => {
      if (!knownParams.includes(key) && !key.startsWith('sort[')) {
        try {
          const parsed = JSON.parse(value);
          if (
            typeof parsed === 'string' ||
            typeof parsed === 'number' ||
            typeof parsed === 'boolean' ||
            Array.isArray(parsed)
          ) {
            filter[key] = parsed as FilterParams[string];
          } else {
            filter[key] = value;
          }
        } catch {
          filter[key] = value;
        }
      }
    });

    if (Object.keys(filter).length > 0) {
      result.filter = filter;
    }

    return result;
  }
}
