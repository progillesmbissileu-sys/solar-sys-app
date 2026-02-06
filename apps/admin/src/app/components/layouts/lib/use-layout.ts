import { useLayoutStore } from "./layout-store"

export const useLayout = () => {
  const layout = useLayoutStore()

  console.log(layout)

  return {
    toggleMenu: layout.activateNavbarItem,
    toggleSidebar: layout.toggleSidebar,
    toggleMobileMenu: layout.toggleMobileMenu,
    activeMenu: layout.activeNavbarItem,
    isSidebarOpen: layout.isSidebarOpen,
    isMobileMenuOpen: layout.isMobileMenuOpen,
  }
}
