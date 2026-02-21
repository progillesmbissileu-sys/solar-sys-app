import { authFetchJson, AuthFetchOptions } from "@/shared/api/client/api-client"
import { env } from "@/shared/config"

const apiEndpoint = env.NEXT_PUBLIC_API_ENDPOINT

export function callAction<TData = any, TReturn = any>(
  path: string,
  method: string,
  options?: Omit<AuthFetchOptions, "method" | "body">,
) {
  return async (payload?: TData): Promise<TReturn> => {
    try {
      const response = await authFetchJson<TReturn>(`${apiEndpoint}${path}`, {
        ...options,
        method,
        body: payload ? JSON.stringify(payload) : undefined,
      })
      return response
    } catch (error) {
      return error as any
    }
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

    return await authFetchJson<TReturn>(`${apiEndpoint}${path}`, {
      method,
      body: payload ? JSON.stringify(payload) : undefined,
      ...options,
    })
  }
}
