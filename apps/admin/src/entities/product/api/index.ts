import { callAction } from "@/shared/api"

export const productCollection = callAction("/api/product", "get", {
  skipAuth: true,
})
