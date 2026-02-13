import { getServerAccessToken } from "@/shared/lib/auth/helpers/server-token"
import { refreshAccessToken } from "../lib/auth/helpers/session"
import { getClientAccessToken } from "@/shared/lib/auth/helpers/client-token"

export interface AuthFetchOptions extends RequestInit {
  skipAuth?: boolean
  retry?: boolean
}

/**
 * Authenticated fetch wrapper that automatically includes the access token
 * Works both client-side and server-side
 */
export async function authFetch(
  url: string,
  options: AuthFetchOptions = {},
): Promise<Response> {
  const { skipAuth = false, retry = true, ...fetchOptions } = options

  // Get the access token
  let accessToken: string | null = null

  if (!skipAuth) {
    accessToken =
      typeof window !== "undefined"
        ? getClientAccessToken()
        : await getServerAccessToken()
  }

  // Prepare headers
  const headers = new Headers(fetchOptions.headers)

  if (accessToken && !skipAuth) {
    headers.set("Authorization", `Bearer ${accessToken}`)
  }

  // Make the request
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  })

  // If we get a 401 and haven't retried yet, try to refresh the token
  if (response.status === 401 && retry && !skipAuth) {
    const newAccessToken = await refreshAccessToken()

    if (newAccessToken) {
      // Retry the request with the new token
      const newHeaders = new Headers(fetchOptions.headers)
      newHeaders.set("Authorization", `Bearer ${newAccessToken}`)

      return fetch(url, {
        ...fetchOptions,
        headers: newHeaders,
      })
    }
  }

  return response
}

/**
 * Convenience methods for common HTTP verbs
 */
export const authApi = {
  post: async (url: string, data?: any, options?: AuthFetchOptions) => {
    return authFetch(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  put: async (url: string, data?: any, options?: AuthFetchOptions) => {
    return authFetch(url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  patch: async (url: string, data?: any, options?: AuthFetchOptions) => {
    return authFetch(url, {
      ...options,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  get: async (url: string, options?: AuthFetchOptions) => {
    return authFetch(url, { ...options, method: "GET" })
  },

  delete: async (url: string, options?: AuthFetchOptions) => {
    return authFetch(url, { ...options, method: "DELETE" })
  },
}

/**
 * Type-safe wrapper that also parses JSON response
 */
export async function authFetchJson<T>(
  url: string,
  options?: AuthFetchOptions,
): Promise<T> {
  const response = await authFetch(url, options)

  if (response.ok) {
    return response.json()
  }

  return Promise.reject(response)
}
