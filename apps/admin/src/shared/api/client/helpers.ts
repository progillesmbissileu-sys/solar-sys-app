import { authFetchJson, authFetch } from './api-client';
import { RequestConfig, ApiError, Result } from './types';
import { env } from '@/shared/config';
import { CollectionQueryParams } from '../collection/types';
import { CollectionHelpers } from '../collection/helpers';

const apiEndpoint = env.NEXT_PUBLIC_API_ENDPOINT;

/**
 * Creates a reusable API action function for a specific endpoint
 *
 * @param path - The API endpoint path
 * @param method - The HTTP method to use
 * @param options - Additional request configuration options
 * @returns A function that can be called with payload and query parameters
 *
 * @example
 * // Define the action
 * const getProducts = callAction<CollectionResponse<Product>>('/api/products', 'GET');
 *
 * // Call the action
 * const products = await getProducts(undefined, { page: 1, limit: 10 });
 *
 * // POST example
 * const createProduct = callAction<Product>('/api/products', 'POST');
 * const newProduct = await createProduct({ name: 'New Product', price: 100 });
 */
export function callAction<
  TReturn = void,
  TQuery extends CollectionQueryParams = CollectionQueryParams,
>(path: string, method: RequestConfig['method'], options?: Omit<RequestConfig, 'method' | 'data'>) {
  return async (payload?: unknown, query?: TQuery): Promise<TReturn> => {
    const queryString = query ? `?${CollectionHelpers.paramsToQueryString(query)}` : '';

    const response = await authFetchJson<TReturn>(`${apiEndpoint}${path}${queryString}`, {
      ...options,
      method,
      data: payload,
    });

    return response;
  };
}

/**
 * Creates a reusable API action function for endpoints that require an ID parameter
 * The ID is substituted into the path where {id} or similar pattern exists
 *
 * @param path - The API endpoint path with a placeholder for ID (e.g., '/api/products/{id}')
 * @param method - The HTTP method to use
 * @param options - Additional request configuration options
 * @returns A function that can be called with resourceId, payload, and query parameters
 *
 * @example
 * // Define the action
 * const getProduct = callActionWithId<{ data: Product }>('/api/products/{id}', 'GET');
 *
 * // Call the action
 * const product = await getProduct('123');
 *
 * // Update example
 * const updateProduct = callActionWithId<Product>('/api/products/{id}', 'PATCH');
 * const updated = await updateProduct('123', { name: 'Updated Name' });
 */
export function callActionWithId<
  TReturn = void,
  TQuery extends CollectionQueryParams = CollectionQueryParams,
>(path: string, method: RequestConfig['method'], options?: Omit<RequestConfig, 'method' | 'data'>) {
  return async (resourceId: string, payload?: unknown, query?: TQuery): Promise<TReturn> => {
    // Find and replace the placeholder pattern
    const pathChunks = path.split('/');
    const pattern = pathChunks.find((chunk) => chunk.startsWith('{') && chunk.endsWith('}'));

    const resolvedPath = pattern ? path.replace(pattern, resourceId) : path;

    const queryString = query ? `?${CollectionHelpers.paramsToQueryString(query)}` : '';

    return authFetchJson<TReturn>(`${apiEndpoint}${resolvedPath}${queryString}`, {
      method,
      data: payload,
      ...options,
    });
  };
}

/**
 * Creates a safe API action function that returns a Result type instead of throwing
 * Useful for handling errors in a more functional way without try-catch
 *
 * @param path - The API endpoint path
 * @param method - The HTTP method to use
 * @param options - Additional request configuration options
 * @returns A function that returns a Result type with success or error
 *
 * @example
 * // Define the safe action
 * const createProductSafe = callActionSafe<Product>('/api/products', 'POST');
 *
 * // Call and handle result
 * const result = await createProductSafe({ name: 'New Product' });
 *
 * if (result.success) {
 *   console.log('Created:', result.data);
 * } else {
 *   console.error('Error:', result.error.message);
 * }
 */
export function callActionSafe<
  TReturn = void,
  TQuery extends CollectionQueryParams = CollectionQueryParams,
>(path: string, method: RequestConfig['method'], options?: Omit<RequestConfig, 'method' | 'data'>) {
  return async (payload?: unknown, query?: TQuery): Promise<Result<TReturn>> => {
    try {
      const queryString = query ? `?${CollectionHelpers.paramsToQueryString(query)}` : '';

      const data = await authFetchJson<TReturn>(`${apiEndpoint}${path}${queryString}`, {
        ...options,
        method,
        data: payload,
      });

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  };
}

/**
 * Creates a safe API action function with ID parameter that returns a Result type
 *
 * @param path - The API endpoint path with a placeholder for ID
 * @param method - The HTTP method to use
 * @param options - Additional request configuration options
 * @returns A function that returns a Result type with success or error
 *
 * @example
 * // Define the safe action
 * const updateProductSafe = callActionWithIdSafe<Product>('/api/products/{id}', 'PATCH');
 *
 * // Call and handle result
 * const result = await updateProductSafe('123', { name: 'Updated' });
 *
 * if (result.success) {
 *   console.log('Updated:', result.data);
 * } else {
 *   console.error('Error:', result.error.message);
 * }
 */
export function callActionWithIdSafe<
  TReturn = void,
  TQuery extends CollectionQueryParams = CollectionQueryParams,
>(path: string, method: RequestConfig['method'], options?: Omit<RequestConfig, 'method' | 'data'>) {
  return async (
    resourceId: string,
    payload?: unknown,
    query?: TQuery
  ): Promise<Result<TReturn>> => {
    try {
      // Find and replace the placeholder pattern
      const pathChunks = path.split('/');
      const pattern = pathChunks.find((chunk) => chunk.startsWith('{') && chunk.endsWith('}'));

      const resolvedPath = pattern ? path.replace(pattern, resourceId) : path;

      const queryString = query ? `?${CollectionHelpers.paramsToQueryString(query)}` : '';

      const data = await authFetchJson<TReturn>(`${apiEndpoint}${resolvedPath}${queryString}`, {
        method,
        data: payload,
        ...options,
      });

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  };
}

// Re-export authFetch for direct usage
export { authFetch, authFetchJson } from './api-client';
