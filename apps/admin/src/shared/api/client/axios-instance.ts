import axios, { AxiosInstance, AxiosInterceptorOptions, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { InterceptorManager } from './types';

/**
 * Creates and configures the Axios instance with default settings
 */
function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
}

/**
 * Singleton Axios instance for all API requests
 */
export const apiClient: AxiosInstance = createAxiosInstance();

/**
 * Interceptor manager for adding, removing, and clearing interceptors
 * 
 * @example
 * // Add a request interceptor
 * const requestId = interceptors.request.use(
 *   (config) => {
 *     console.log('Request:', config.url);
 *     return config;
 *   },
 *   (error) => Promise.reject(error)
 * );
 * 
 * // Remove the interceptor
 * interceptors.request.eject(requestId);
 * 
 * // Clear all request interceptors
 * interceptors.request.clear();
 */
export const interceptors: InterceptorManager = {
  request: {
    use: (
      onFulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
      onRejected?: (error: unknown) => unknown,
      options?: AxiosInterceptorOptions
    ): number => apiClient.interceptors.request.use(onFulfilled, onRejected),
    eject: (id: number): void => {
      apiClient.interceptors.request.eject(id);
    },
    clear: (): void => {
      apiClient.interceptors.request.clear();
    },
  },
  response: {
    use: (
      onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
      onRejected?: (error: unknown) => unknown,
      options?: AxiosInterceptorOptions
    ): number => apiClient.interceptors.response.use(onFulfilled, onRejected),
    eject: (id: number): void => {
      apiClient.interceptors.response.eject(id);
    },
    clear: (): void => {
      apiClient.interceptors.response.clear();
    },
  },
};
