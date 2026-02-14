import { useLayoutStore } from "./layout-store"

export const useLayout = () => {
  const layout = useLayoutStore()

  return {
    toggleMenu: layout.activateNavbarItem,
    toggleSidebar: layout.toggleSidebar,
    toggleMobileMenu: layout.toggleMobileMenu,
    activeMenu: layout.activeNavbarItem,
    isSidebarOpen: layout.isSidebarOpen,
    isMobileMenuOpen: layout.isMobileMenuOpen,
  }
}
