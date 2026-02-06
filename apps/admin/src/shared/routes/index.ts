export const appRoutes = {
  DASHBOARD: "/",

  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  LOGOUT: "/logout",

  PRODUCTS: "/products",
  PRODUCTS_MANAGEMENT: "/products",
  PRODUCTS_DETAILS: "/products/details/:id",
  PRODUCTS_ADD: "/products/add",

  PRODUCTS_CATEGORIES: "/products/categories",
  PRODUCTS_CATEGORIES_ADD: "/products/categories/add",
  PRODUCTS_CATEGORIES_VIEW: "/products/categories/view/:id",

  USERS: "/users",
  USERS_ADD: "/users/add",
  USERS_VIEW: "/users/view/:id",
  USERS_PROFILE: "/users/profile",
  USERS_SETTINGS: "/users/settings",
  USERS_PERMISSIONS: "/users/permissions",

  LOCATIONS: "/locations",
  LOCATIONS_ADD: "/locations/add",
  LOCATIONS_VIEW: "/locations/view/:id",
} as const

export type AppRoutes = typeof appRoutes
export type AppRouteKey = keyof AppRoutes
export type AppRoutePath = AppRoutes[AppRouteKey]
