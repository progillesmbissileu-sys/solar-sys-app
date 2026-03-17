import { AxiosError, AxiosResponse } from 'axios';
import { getAccessToken } from '@/shared/lib/auth/helpers/server-token';
import { refreshAccessToken } from '../../lib/auth/helpers/session';
import { apiClient, interceptors } from './axios-instance';
import { requestCancellation } from './cancellation';
import { calculateRetryDelay, shouldRetry, sleep, normalizeRetryConfig } from './retry';
import {
  ApiError,
  ApiResponse,
  RequestConfig,
  RetryConfig,
  Result,
  DEFAULT_RETRY_CONFIG,
} from './types';

// Re-export types and utilities
export type { ApiError, ApiResponse, RequestConfig, RetryConfig, Result };
export { interceptors, requestCancellation, DEFAULT_RETRY_CONFIG };

/**
 * Converts an AxiosError to a structured ApiError
 *
 * @param error - The Axios error to convert
 * @returns A structured ApiError object
 */
function toApiError(error: AxiosError): ApiError {
  const responseData = error.response?.data as Record<string, unknown> | undefined;

  return {
    status: error.response?.status ?? 0,
    statusText: error.response?.statusText ?? 'Unknown Error',
    message: (responseData?.message as string) ?? error.message ?? 'An unexpected error occurred',
    details:
      (responseData?.details as ApiError['details']) ??
      (responseData?.errors as ApiError['details']),
    timestamp: responseData?.timestamp as string | undefined,
    path: (responseData?.path as string) ?? error.config?.url,
  };
}

/**
 * Creates a cancelled request error
 *
 * @returns An ApiError representing a cancelled request
 */
function createCancelledError(): ApiError {
  return {
    status: 0,
    statusText: 'Cancelled',
    message: 'Request was cancelled',
  };
}

/**
 * Main authenticated fetch function with retry, cancellation, and interceptor support
 *
 * @param url - The URL to fetch
 * @param config - Request configuration options
 * @returns A promise resolving to an ApiResponse
 * @throws ApiError when the request fails
 *
 * @example
 * // Basic usage
 * const response = await authFetch<Product>('/api/products/123');
 * console.log(response.data);
 *
 * // With custom retry configuration
 * const response = await authFetch('/api/products', {
 *   method: 'POST',
 *   data: { name: 'New Product' },
 *   retry: {
 *     enabled: true,
 *     maxRetries: 3,
 *     retryDelay: 500,
 *     retryOn: [500, 502, 503],
 *     exponentialBackoff: true,
 *   },
 * });
 *
 * // With request cancellation
 * const controller = new AbortController();
 * const promise = authFetch('/api/products', { signal: controller.signal });
 * controller.abort(); // Cancel the request
 *
 * // Skip authentication
 * const response = await authFetch('/public/health', { skipAuth: true });
 */
export async function authFetch<T = unknown>(
  url: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    skipAuth = false,
    retry = true,
    signal: externalSignal,
    headers: customHeaders,
    ...axiosConfig
  } = config;

  const retryConfig = normalizeRetryConfig(retry);

  let attempt = 0;
  let lastError: ApiError | null = null;

  while (attempt <= retryConfig.maxRetries) {
    try {
      // Get access token if authentication is required
      let accessToken: string | null = null;
      if (!skipAuth) {
        accessToken = await getAccessToken();
      }

      // Prepare headers
      const headers: Record<string, string> = {
        ...(customHeaders as Record<string, string>),
      };

      if (accessToken && !skipAuth) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      // Make the request
      const response: AxiosResponse<T> = await apiClient.request<T>({
        url,
        ...axiosConfig,
        headers,
        signal: externalSignal,
        validateStatus: (status) => status < 500, // Don't throw on 4xx/5xx
      });

      console.log('AXIOS RESPONSE', JSON.stringify(response.data, null, 2));

      // Handle 401 - try to refresh token
      if (response.status === 401 && retryConfig.enabled && !skipAuth) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          // Retry with new token
          const retryResponse = await apiClient.request<T>({
            url,
            ...axiosConfig,
            headers: {
              ...headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
            signal: externalSignal,
          });

          return {
            data: retryResponse.data,
            status: retryResponse.status,
            statusText: retryResponse.statusText,
            headers: retryResponse.headers as Record<string, string>,
          };
        }
      }

      // Check for error status (4xx errors that shouldn't be retried)
      if (response.status >= 400) {
        const error = new AxiosError(
          `Request failed with status ${response.status}`,
          undefined,
          undefined,
          { url, ...axiosConfig, headers },
          response
        );
        throw error;
      }

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers as Record<string, string>,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      // Handle cancellation
      if (
        axiosError.name === 'CanceledError' ||
        axiosError.code === 'ERR_CANCELED' ||
        axiosError.code === 'ECONNABORTED'
      ) {
        throw createCancelledError();
      }

      lastError = toApiError(axiosError);

      // Handle 401 with token refresh
      if (axiosError.response?.status === 401 && retryConfig.enabled && !skipAuth) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          attempt++;
          continue;
        }
      }

      // Check if we should retry
      if (shouldRetry(axiosError, retryConfig, attempt)) {
        const delay = calculateRetryDelay(attempt, retryConfig);
        await sleep(delay);
        attempt++;
        continue;
      }

      throw lastError;
    }
  }

  // All retries exhausted
  throw lastError!;
}

/**
 * Type-safe wrapper that parses JSON response
 *
 * @param url - The URL to fetch
 * @param config - Request configuration options
 * @returns A promise resolving to the parsed JSON data
 * @throws ApiError when the request fails
 *
 * @example
 * // Basic usage
 * const products = await authFetchJson<Product[]>('/api/products');
 *
 * // With query parameters
 * const response = await authFetchJson<{ data: Product[], meta: PaginationMeta }>(
 *   '/api/products?page=1&limit=10'
 * );
 */
export async function authFetchJson<T>(url: string, config?: RequestConfig): Promise<T> {
  const response = await authFetch<T>(url, config);
  return response.data;
}
