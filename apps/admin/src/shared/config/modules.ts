import type { AppRoutePath } from "@/shared/routes"
import React from "react"

export type AppModuleConfig = {
  key: string
  title: string
  path: AppRoutePath
  icon: React.JSXElementConstructor<any>
  description?: string
  color?: string
  children?: Omit<
    AppModuleConfig,
    "children" | "icon" | "description" | "color"
  >[]
}
