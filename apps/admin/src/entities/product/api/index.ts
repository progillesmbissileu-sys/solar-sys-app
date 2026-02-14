import { callAction } from "@/shared/api"

export const productCollection = callAction<void, { data: Array<any> }>(
  "/api/product",
  "get",
)
