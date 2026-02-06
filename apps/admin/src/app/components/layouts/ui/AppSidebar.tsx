"use client"

import { Divider } from "@/shared/ui/atoms/Divider"
import { Input } from "@/shared/ui/atoms/Input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarLink,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSubLink,
} from "@/shared/ui/molecules/sidebar/Sidebar"
import { cx, focusRing } from "@/shared/lib/utils"
import { RiArrowDownSFill } from "@remixicon/react"
import * as React from "react"
import { UserProfile } from "@/shared/ui/molecules/userProfile/UserProfile"
import { companyConfig } from "@/shared/config"
import Image from "next/image"
import { productModuleConfig } from "@/modules/product/config/module"
import { dashboardModuleConfig } from "@/modules/dashboard"
import { locationModuleConfig } from "@/modules/location"
import { useLayout } from "@/app/components/layouts/lib/use-layout"

const navigation = [dashboardModuleConfig, locationModuleConfig]

const navigation2 = [productModuleConfig]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const context = useLayout()
  const [openMenus, setOpenMenus] = React.useState<string[]>([])

  return (
    <Sidebar {...props} className="bg-gray-50 dark:bg-gray-925">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-white p-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
            <Image
              src={companyConfig.logo}
              alt="company logo"
              width={24}
              height={24}
            />
          </span>
          <div>
            <span className="block text-sm font-semibold text-gray-900 dark:text-gray-50">
              {companyConfig.name}
            </span>
            <span className="block text-xs text-gray-900 dark:text-gray-50">
              {companyConfig.description}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Input
              type="search"
              placeholder="Search items..."
              className="[&>input]:sm:py-1.5"
            />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => (
                <SidebarMenuItem
                  key={item.key}
                  onClick={() => context.toggleMenu(item.key)}
                >
                  <SidebarLink
                    href={item.path}
                    isActive={context.activeMenu === item.key}
                    icon={item.icon}
                    notifications={false}
                  >
                    {item.title}
                  </SidebarLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-3">
          <Divider className="my-0 py-0" />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {navigation2.map((item) => (
                <SidebarMenuItem key={item.key}>
                  {/* @CHRIS/SEV: discussion whether to componentize (-> state mgmt) */}
                  <button
                    onClick={() =>
                      setOpenMenus((prev) =>
                        prev.includes(item.key)
                          ? prev.filter((key) => key !== item.key)
                          : [...prev, item.key],
                      )
                    }
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 rounded-md p-2 text-base text-gray-900 transition hover:bg-gray-200/50 sm:text-sm dark:text-gray-400 hover:dark:bg-gray-900 hover:dark:text-gray-50",
                      focusRing,
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        className="size-[18px] shrink-0"
                        aria-hidden="true"
                      />
                      {item.title}
                    </div>
                    <RiArrowDownSFill
                      className={cx(
                        openMenus.includes(item.key)
                          ? "rotate-0"
                          : "-rotate-90",
                        "size-5 shrink-0 transform text-gray-400 transition-transform duration-150 ease-in-out dark:text-gray-600",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {item.children && openMenus.includes(item.key) && (
                    <SidebarMenuSub>
                      <div className="absolute inset-y-0 left-4 w-px bg-gray-300 dark:bg-gray-800" />
                      {item.children.map((child) => (
                        <div
                          key={child.key}
                          onClick={() => context.toggleMenu(child.key)}
                        >
                          <SidebarMenuItem>
                            <SidebarSubLink
                              href={child.path}
                              isActive={context.activeMenu == child.key}
                            >
                              {child.title}
                            </SidebarSubLink>
                          </SidebarMenuItem>
                        </div>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="border-t border-gray-200 dark:border-gray-800" />
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
