export const changeSidebarState = () => {
  const sidebarState = localStorage.getItem("isSidebarOpen") || "true"
  const state = sidebarState !== "true"
  console.log(state)
  localStorage.setItem("isSidebarOpen", state.toString())
}

export const activateNavigationItem = (key: string) =>
  localStorage.setItem("activeNavbarItem", key)

export const getActivateNavigationItem = () =>
  localStorage.getItem("activeNavbarItem")
