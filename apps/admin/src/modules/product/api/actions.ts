"use server"

import {
  CategoryCreatePayload,
  CategoryUpdatePayload,
} from "@/entities/product"
import { callAction } from "@/shared/api"
import { refreshPageCache } from "@/shared/lib"
import { extractFormPayload } from "@/shared/ui/organisms/Form"

export const createProductCategory = async (
  _prev: unknown,
  formData: FormData,
) => {
  const payload = extractFormPayload<CategoryCreatePayload>(formData)

  await callAction<CategoryCreatePayload, void>(
    "/api/product-category/create",
    "POST",
  )(payload)

  await refreshPageCache()
}

export const updateProductCategory = async (
  _prev: unknown,
  formData: FormData,
) => {
  const payload = extractFormPayload<CategoryUpdatePayload>(formData)

  await callAction<CategoryUpdatePayload, void>(
    `/api/product-category/${payload.id}`,
    "PATCH",
  )(payload)

  await refreshPageCache()
}
