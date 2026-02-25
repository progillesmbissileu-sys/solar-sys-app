import { authFetchJson, AuthFetchOptions } from "@/shared/api/client/api-client"
import { env } from "@/shared/config"
import { CollectionQueryParams } from "../collection/types"
import { CollectionHelpers } from "../collection/helpers"

const apiEndpoint = env.NEXT_PUBLIC_API_ENDPOINT

export function callAction<
  TData = any,
  TReturn = any,
  TQuery extends CollectionQueryParams = CollectionQueryParams,
>(
  path: string,
  method: AuthFetchOptions["method"],
  options?: Omit<AuthFetchOptions, "method" | "data">,
) {
  return async (payload?: TData, query?: TQuery): Promise<TReturn> => {
    try {
      const response = await authFetchJson<TReturn>(
        `${apiEndpoint}${path}${query ? `?${CollectionHelpers.paramsToQueryString(query)}` : ""}`,
        {
          ...options,
          method,
          data: payload,
        },
      )
      return response
    } catch (error) {
      return error as any
    }
  }
}

export function callActionWithId<
  TData = any,
  TReturn = any,
  TQuery extends CollectionQueryParams = CollectionQueryParams,
>(
  path: string,
  method: AuthFetchOptions["method"],
  options?: Omit<AuthFetchOptions, "method" | "data">,
) {
  return async (resourceId: string, payload?: TData, query?: TQuery) => {
    const pathChunks = path.split("/")
    const pattern = pathChunks.find(
      (chunk) => chunk.startsWith("{") && chunk.endsWith("}"),
    )

    path = path.replace(pattern!, resourceId)

    return await authFetchJson<TReturn>(
      `${apiEndpoint}${path}${query ? `?${CollectionHelpers.paramsToQueryString(query)}` : ""}`,
      {
        method,
        data: payload,
        ...options,
      },
    )
  }
}
