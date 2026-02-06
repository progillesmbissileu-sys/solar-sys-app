import { AppModuleConfig } from "@/shared/config"
import { appRoutes } from "@/shared/routes"
import { StoreIcon } from "lucide-react"

export const locationModuleConfig: AppModuleConfig = {
  icon: StoreIcon,
  key: "location",
  path: appRoutes.LOCATIONS,
  title: "location.menuTitle",
  // children: [],
}
