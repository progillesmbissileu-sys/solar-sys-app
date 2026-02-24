import { callAction, CollectionResponseType } from "@/shared/api"
import { Product } from "../model/product"
import { ProductCategory } from "../model/product-category"

export const productCollection = callAction<
  void,
  CollectionResponseType<Product>
>("/api/product", "get")

export const productCategoryCollection = callAction<
  void,
  CollectionResponseType<ProductCategory>
>("/api/product-category", "get")
