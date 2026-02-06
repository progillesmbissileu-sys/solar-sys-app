import { create } from "zustand"
import { LayoutContext } from "../model"
import { createJSONStorage, persist } from "zustand/middleware"

export const useLayoutStore = create<LayoutContext>()(
  persist(
    (set, get) => {
      return {
        isSidebarOpen: true,
        isMobileMenuOpen: false,
        activeNavbarItem: "dashboard",

        activateNavbarItem: (key: string) => set({ activeNavbarItem: key }),

        toggleSidebar: () => {
          const open = !get().isSidebarOpen
          set({ isSidebarOpen: open })
        },

        toggleMobileMenu: () => {
          const open = !get().isMobileMenuOpen
          set({ isMobileMenuOpen: open })
        },
      }
    },
    {
      name: "layout-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeNavbarItem: state.activeNavbarItem,
        isSidebarOpen: state.isSidebarOpen,
        isMobileMenuOpen: state.isMobileMenuOpen,
      }),
    },
  ),
)
