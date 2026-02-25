import { AppModuleConfig } from "@/shared/config"
import { LayoutDashboard } from "lucide-react"
import { routePaths } from "@/shared/routes"

export const dashboardModuleConfig: AppModuleConfig = {
  icon: LayoutDashboard,
  key: "dashboard",
  path: routePaths.DASHBOARD,
  title: "dashboard.menuTitle",
}
