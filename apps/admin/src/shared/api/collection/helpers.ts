import { CollectionQueryParams } from "./types"

export class CollectionHelpers {
  static paramsToQueryString(params?: CollectionQueryParams): string {
    if (!params) return ""

    const query = new URLSearchParams()

    if (params.q) query.set("q", params.q)

    if (params.page) query.set("page", params.page.toString())

    if (params.limit) query.set("limit", params.limit.toString())

    if (params.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        query.set(`${key}`, JSON.stringify(value))
      })
    }

    if (params.sort) {
      Object.entries(params.sort).forEach(([key, value]) => {
        query.set(`${key}`, JSON.stringify(value))
      })
    }

    return query.toString()
  }
}
