import { env } from '@/shared/config';

import { CollectionHelpers } from '../collection/helpers';
import { CollectionQueryParams } from '../collection/types';
import { authFetchJson } from './api-client';
import { ApiError, RequestConfig, Result } from './types';

const apiEndpoint = env.NEXT_PUBLIC_API_ENDPOINT;

/**
 * Creates a reusable API action function for a specific endpoint
 */

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
 * const createProductSafe = callAction<Product>('/api/products', 'POST');
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
export function callAction<
  TReturn = void,
  TQuery extends CollectionQueryParams = CollectionQueryParams,
  TData extends object = any,
>(path: string, method: RequestConfig['method'], options?: Omit<RequestConfig, 'method' | 'data'>) {
  return async (query?: TQuery, payload?: TData): Promise<Result<TReturn>> => {
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
 * const updateProductSafe = callActionWithId<Product>('/api/products/{id}', 'PATCH');
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
export function callActionWithId<
  TReturn = void,
  TQuery extends CollectionQueryParams = CollectionQueryParams,
  TData extends object = any,
>(path: string, method: RequestConfig['method'], options?: Omit<RequestConfig, 'method' | 'data'>) {
  return async (resourceId: string, payload?: TData, query?: TQuery): Promise<Result<TReturn>> => {
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

export function mutation<TData extends object = any, TReturn = void>(
  path: string,
  method: RequestConfig['method'] = 'post'
) {
  return (payload: TData) => {
    return callAction<TReturn, any, TData>(path, method)(null, payload);
  };
}

export function mutationWithId<TData extends object = any, TReturn = void>(
  path: string,
  method: RequestConfig['method'] = 'put'
) {
  return (id: string, payload: TData) => {
    return callActionWithId<TReturn, any, TData>(path, method)(id, payload);
  };
}
