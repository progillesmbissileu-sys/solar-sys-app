import { authFetchJson, AuthFetchOptions } from "@/shared/api/api-client"
import { env } from "@/shared/config"

const baseUrl = env.NEXT_PUBLIC_API_ENDPOINT

export function callAction<TData = any, TReturn = any>(
  path: string,
  method: string,
  options?: Omit<AuthFetchOptions, "method" | "body">,
) {
  return async (payload?: TData) => {
    return await authFetchJson<TReturn>(`${baseUrl}${path}`, {
      method,
      body: payload ? JSON.stringify(payload) : undefined,
      ...options,
    })
  }
}

export function callActionWithId<TData = any, TReturn = any>(
  path: string,
  method: string,
  options?: Omit<AuthFetchOptions, "method" | "body">,
) {
  return async (resourceId: string, payload?: TData) => {
    const pathChunks = path.split("/")
    const pattern = pathChunks.find(
      (chunk) => chunk.startsWith("{") && chunk.endsWith("}"),
    )

    path = path.replace(`{${pattern!}}`, resourceId)

    return await authFetchJson<TReturn>(`${baseUrl}${path}`, {
      method,
      body: payload ? JSON.stringify(payload) : undefined,
      ...options,
    })
  }
}
