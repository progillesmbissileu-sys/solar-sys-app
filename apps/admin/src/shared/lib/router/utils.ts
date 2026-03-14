/**
 * Builds a complete URL from a route template with dynamic segments and optional query parameters.
 *
 * @param route - Route template with dynamic segments (e.g., '/products/:id/edit')
 * @param params - Object mapping dynamic segment names to values (e.g., { id: '123' })
 * @param searchQuery - Optional object for URL query parameters (e.g., { page: '1', sort: 'desc' })
 * @returns Complete URL string (e.g., '/products/123/edit?page=1&sort=desc')
 *
 * @example
 * buildRoute('/products/:id', { id: '123' })
 * // Returns: '/products/123'
 *
 * @example
 * buildRoute('/products/:id/edit', { id: '123' }, { ref: 'dashboard' })
 * // Returns: '/products/123/edit?ref=dashboard'
 */
export const buildRoute = (
  route: string,
  params: Record<string, string | number>,
  searchQuery?: Record<string, string | number>
): string => {
  // Replace dynamic segments (:paramName) with their values
  let pathname = route;
  for (const [key, value] of Object.entries(params)) {
    pathname = pathname.replace(`:${key}`, String(value));
  }

  // Build query string if searchQuery is provided
  if (searchQuery && Object.keys(searchQuery).length > 0) {
    const queryString = Object.entries(searchQuery)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');
    pathname = `${pathname}?${queryString}`;
  }

  return pathname;
};
