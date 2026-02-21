import { getAccessToken } from "@/shared/lib/auth/helpers/server-token"
import { refreshAccessToken } from "../../lib/auth/helpers/session"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

export interface AuthFetchOptions extends AxiosRequestConfig {
  skipAuth?: boolean
  retry?: boolean
  maxRetries?: number
}

export async function authFetch(
  url: string,
  options: AuthFetchOptions = {},
): Promise<AxiosResponse> {
  const {
    skipAuth = false,
    retry = true,
    maxRetries = 2,
    headers: customHeaders,
    ...axiosOptions
  } = options

  let attempt = 0
  let lastResponse: AxiosResponse | null = null

  while (attempt <= maxRetries) {
    try {
      // Get the access token
      let accessToken: string | null = null

      if (!skipAuth) {
        accessToken = await getAccessToken()
      }

      // Prepare headers
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(customHeaders as Record<string, string>),
      }

      if (accessToken && !skipAuth) {
        headers["Authorization"] = `Bearer ${accessToken}`
      }

      // Make the request
      const response = await axios({
        url,
        ...axiosOptions,
        headers,
        // Let us handle all statuses manually (no throw for non-2xx)
        validateStatus: () => true,
      })

      console.log(`Attempt ${attempt} of ${maxRetries}`, response?.status)

      // If we get a 401 and haven't retried yet, try to refresh the token
      if (response.status === 401 && retry && !skipAuth) {
        const newAccessToken = await refreshAccessToken()

        if (newAccessToken) {
          // Retry the request with the new token
          const retryHeaders = {
            ...headers,
            Authorization: `Bearer ${newAccessToken}`,
          }

          return axios({
            url,
            ...axiosOptions,
            headers: retryHeaders,
          })
        }
      }

      // Retry on transient server errors
      if (response.status >= 500 && retry && attempt < maxRetries) {
        lastResponse = response
        attempt++
        continue
      }

      return response
    } catch (error: any) {
      const status = error.response?.status

      // Handle 401 in catch if validateStatus was different or if it threw
      if (status === 401 && retry && !skipAuth) {
        const newAccessToken = await refreshAccessToken()
        if (newAccessToken) {
          return axios({
            url,
            ...axiosOptions,
            headers: {
              ...customHeaders,
              Authorization: `Bearer ${newAccessToken}`,
              "Content-Type": "application/json",
            },
          })
        }
      }

      if (retry && attempt < maxRetries) {
        attempt++
        continue
      }
      throw error
    }
  }

  return lastResponse!
}

/**
 * Type-safe wrapper that also parses JSON response
 */
export async function authFetchJson<T>(
  url: string,
  options?: AuthFetchOptions,
): Promise<T> {
  const response = await authFetch(url, options)

  // Axios already parsed the data if it's JSON
  return response.data
}
