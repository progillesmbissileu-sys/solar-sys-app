export type LayoutState = {
  isSidebarOpen?: boolean
  isMobileMenuOpen?: boolean
  activeNavbarItem: string
}

export type LayoutActions = {
  toggleSidebar: () => void
  toggleMobileMenu: () => void
  activateNavbarItem: (key: string) => void
}

export type LayoutContext = LayoutState & LayoutActions
