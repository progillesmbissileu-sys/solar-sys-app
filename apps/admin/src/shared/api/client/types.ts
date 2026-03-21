import {
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * Error detail structure from API responses
 */
export interface ApiErrorDetail {
  code?: string;
  message: string;
  field?: string;
}

/**
 * Structured API error type for type-safe error handling
 */
export interface ApiError {
  status: number;
  statusText: string;
  message: string;
  details?: ApiErrorDetail[];
  timestamp?: string;
  path?: string;
}

/**
 * Response wrapper for type-safe API responses
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * Retry configuration options
 */
export interface RetryConfig {
  /** Enable or disable retry mechanism */
  enabled: boolean;
  /** Maximum number of retry attempts */
  maxRetries: number;
  /** Base delay between retries in milliseconds */
  retryDelay: number;
  /** HTTP status codes that should trigger a retry */
  retryOn: number[];
  /** Use exponential backoff for retry delays */
  exponentialBackoff: boolean;
}

/**
 * Default retry configuration
 */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  enabled: true,
  maxRetries: 2,
  retryDelay: 1000,
  retryOn: [408, 429, 500, 502, 503, 504],
  exponentialBackoff: true,
};

/**
 * Request configuration extending AxiosRequestConfig
 */
export interface RequestConfig extends Omit<AxiosRequestConfig, 'signal'> {
  /** Skip authentication header injection */
  skipAuth?: boolean;
  /** Retry configuration or boolean to enable/disable */
  retry?: RetryConfig | boolean;
  /** AbortSignal for request cancellation */
  signal?: AbortSignal;
}

/**
 * Result type for type-safe error handling
 */
export type Result<T = unknown, E = ApiError> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Interceptor manager interface for type-safe interceptor management
 */
export interface InterceptorManager {
  request: {
    use: (
      onFulfilled?: (
        config: InternalAxiosRequestConfig
      ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
      onRejected?: (error: unknown) => unknown,
      options?: AxiosInterceptorOptions
    ) => number;
    eject: (id: number) => void;
    clear: () => void;
  };
  response: {
    use: (
      onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
      onRejected?: (error: unknown) => unknown,
      options?: AxiosInterceptorOptions
    ) => number;
    eject: (id: number) => void;
    clear: () => void;
  };
}
