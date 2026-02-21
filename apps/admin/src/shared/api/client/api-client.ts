import { getAccessToken } from "@/shared/lib/auth/helpers/server-token"
import { refreshAccessToken } from "../../lib/auth/helpers/session"

export interface AuthFetchOptions extends RequestInit {
  skipAuth?: boolean
  retry?: boolean
}

export async function authFetch(
  url: string,
  options: AuthFetchOptions = {},
): Promise<Response> {
  const { skipAuth = false, retry = true, ...fetchOptions } = options

  // Get the access token
  let accessToken: string | null = null

  if (!skipAuth) {
    accessToken = await getAccessToken()
  }

  // Prepare headers
  const headers = new Headers(fetchOptions.headers)

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

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
 * Type-safe wrapper that also parses JSON response
 */
export async function authFetchJson<T>(
  url: string,
  options?: AuthFetchOptions,
): Promise<T> {
  const response = await authFetch(url, options)

  if (response.ok) {
    return await response.json()
  }

  return Promise.reject(await response.json())
}
