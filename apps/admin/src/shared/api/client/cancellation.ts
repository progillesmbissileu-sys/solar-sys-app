/**
 * Request cancellation manager using AbortController
 * Provides utilities for managing request cancellation across the application
 * 
 * @example
 * // Create a cancellable request
 * const key = requestCancellation.createRequestKey('/api/products', 'GET');
 * const controller = requestCancellation.createController(key);
 * 
 * try {
 *   const response = await authFetch('/api/products', {
 *     method: 'GET',
 *     signal: controller.signal,
 *   });
 * } catch (error) {
 *   if (error.message === 'Request was cancelled') {
 *     console.log('Request was cancelled');
 *   }
 * }
 * 
 * // Cancel a specific request
 * requestCancellation.cancel('GET:/api/products');
 * 
 * // Cancel all pending requests
 * requestCancellation.cancelAll();
 */
export class RequestCancellation {
  private controllers: Map<string, AbortController> = new Map();

  /**
   * Creates a unique key for a request based on URL and method
   * @param url - The request URL
   * @param method - The HTTP method
   * @returns A unique key string
   */
  createRequestKey(url: string, method: string): string {
    return `${method.toUpperCase()}:${url}`;
  }

  /**
   * Creates a new AbortController for a request key
   * If a controller already exists for the key, it will be cancelled first
   * @param key - The request key
   * @returns The created AbortController
   */
  createController(key: string): AbortController {
    // Cancel any existing request with the same key
    this.cancel(key);
    
    const controller = new AbortController();
    this.controllers.set(key, controller);
    return controller;
  }

  /**
   * Cancels a specific request by key
   * @param key - The request key to cancel
   */
  cancel(key: string): void {
    const controller = this.controllers.get(key);
    if (controller) {
      controller.abort();
      this.controllers.delete(key);
    }
  }

  /**
   * Cancels all pending requests
   */
  cancelAll(): void {
    this.controllers.forEach((controller) => {
      controller.abort();
    });
    this.controllers.clear();
  }

  /**
   * Gets the AbortSignal for a specific request key
   * @param key - The request key
   * @returns The AbortSignal if the controller exists, undefined otherwise
   */
  getSignal(key: string): AbortSignal | undefined {
    return this.controllers.get(key)?.signal;
  }

  /**
   * Checks if a request is currently pending
   * @param key - The request key
   * @returns True if the request is pending, false otherwise
   */
  isPending(key: string): boolean {
    return this.controllers.has(key);
  }

  /**
   * Gets all pending request keys
   * @returns Array of pending request keys
   */
  getPendingKeys(): string[] {
    return Array.from(this.controllers.keys());
  }
}

/**
 * Singleton instance for request cancellation management
 */
export const requestCancellation = new RequestCancellation();
