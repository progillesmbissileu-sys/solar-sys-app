"use server"

import {
  CategoryCreatePayload,
  CategoryUpdatePayload,
} from "@/entities/product"
import { callAction } from "@/shared/api"
import { refreshPageCache } from "@/shared/lib"
import { routePaths } from "@/shared/routes"
import { extractFormPayload } from "@/shared/ui/organisms/Form"
import { redirect } from "next/navigation"

export const createProductCategoryAction = async (
  _prev: unknown,
  formData: FormData,
) => {
  const payload = extractFormPayload<CategoryCreatePayload>(formData)

  const resp = await callAction<CategoryCreatePayload, void>(
    "/api/product-category",
    "POST",
  )(payload)

  console.error(resp)

  redirect(routePaths.PRODUCTS_CATEGORIES)
}

export const updateProductCategoryAction = async (
  _prev: unknown,
  formData: FormData,
) => {
  const payload = extractFormPayload<CategoryUpdatePayload>(formData)

  const resp = await callAction<CategoryUpdatePayload, void>(
    `/api/product-category/${payload.id}`,
    "PATCH",
  )(payload)

  console.error(resp)

  await refreshPageCache()
}
