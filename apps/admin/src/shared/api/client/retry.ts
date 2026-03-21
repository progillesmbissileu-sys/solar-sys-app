import { AxiosError } from 'axios';

import { DEFAULT_RETRY_CONFIG,RetryConfig } from './types';

/**
 * Calculates the delay before the next retry attempt
 * Uses exponential backoff with optional jitter to prevent thundering herd
 * 
 * @param attempt - The current attempt number (0-indexed)
 * @param config - The retry configuration
 * @returns The delay in milliseconds
 * 
 * @example
 * // With exponential backoff enabled
 * calculateRetryDelay(0, { retryDelay: 1000, exponentialBackoff: true }); // ~1000ms
 * calculateRetryDelay(1, { retryDelay: 1000, exponentialBackoff: true }); // ~2000ms
 * calculateRetryDelay(2, { retryDelay: 1000, exponentialBackoff: true }); // ~4000ms
 */
export function calculateRetryDelay(
  attempt: number,
  config: RetryConfig
): number {
  if (!config.exponentialBackoff) {
    return config.retryDelay;
  }

  // Exponential backoff: delay * 2^attempt with jitter
  const baseDelay = config.retryDelay * Math.pow(2, attempt);
  
  // Add jitter (10% of base delay) to prevent thundering herd
  const jitter = Math.random() * 0.1 * baseDelay;
  
  // Cap at 30 seconds to prevent excessive delays
  return Math.min(baseDelay + jitter, 30000);
}

/**
 * Determines if a request should be retried based on the error and configuration
 * 
 * @param error - The Axios error from the failed request
 * @param config - The retry configuration
 * @param attempt - The current attempt number (0-indexed)
 * @returns True if the request should be retried, false otherwise
 */
export function shouldRetry(
  error: AxiosError,
  config: RetryConfig,
  attempt: number
): boolean {
  // Don't retry if disabled or max attempts reached
  if (!config.enabled || attempt >= config.maxRetries) {
    return false;
  }

  // Get the HTTP status code
  const status = error.response?.status;

  // Check if the status code is in the retry list
  if (status !== undefined && config.retryOn.includes(status)) {
    return true;
  }

  // Retry on network errors (no response)
  if (!error.response && error.code === 'ERR_NETWORK') {
    return true;
  }

  // Retry on timeout
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return true;
  }

  return false;
}

/**
 * Pauses execution for a specified duration
 * 
 * @param ms - The duration to sleep in milliseconds
 * @returns A promise that resolves after the specified duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Normalizes retry configuration from various input formats
 * 
 * @param retry - The retry configuration or boolean
 * @returns A complete RetryConfig object
 */
export function normalizeRetryConfig(retry: RetryConfig | boolean | undefined): RetryConfig {
  if (retry === undefined) {
    return { ...DEFAULT_RETRY_CONFIG };
  }

  if (typeof retry === 'boolean') {
    return { ...DEFAULT_RETRY_CONFIG, enabled: retry };
  }

  return { ...DEFAULT_RETRY_CONFIG, ...retry, enabled: true };
}
