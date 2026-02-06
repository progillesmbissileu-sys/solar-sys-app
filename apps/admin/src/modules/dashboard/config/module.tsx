import { AppModuleConfig } from "@/shared/config"
import { LayoutDashboard } from "lucide-react"
import { appRoutes } from "@/shared/routes"

export const dashboardModuleConfig: AppModuleConfig = {
  icon: LayoutDashboard,
  key: "dashboard",
  path: appRoutes.DASHBOARD,
  title: "dashboard.menuTitle",
}
