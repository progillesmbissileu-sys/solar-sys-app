import { callAction, CollectionResponseType } from "@/shared/api"
import { Product } from "../model/product"

export const productCollection = callAction<
  void,
  CollectionResponseType<Product>
>("/api/product", "get")
