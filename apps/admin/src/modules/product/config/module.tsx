import { AppModuleConfig } from "@/shared/config"
import { appRoutes } from "@/shared/routes"
import { PackageSearch } from "lucide-react"

export const productModuleConfig: AppModuleConfig = {
  icon: PackageSearch,
  key: "product",
  path: appRoutes.PRODUCTS,
  title: "product.menuTitle",
  children: [
    {
      key: "product.management",
      title: "product.management",
      path: appRoutes.PRODUCTS_MANAGEMENT,
    },
    {
      key: "product.category",
      title: "product.categoryManagement",
      path: appRoutes.PRODUCTS_MANAGEMENT,
    },
  ],
}
