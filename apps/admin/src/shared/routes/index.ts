export const routePaths = {
  DASHBOARD: '/dashboard',

  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  LOGOUT: '/logout',

  PRODUCTS: '/products',
  PRODUCTS_MANAGEMENT: '/products',
  PRODUCTS_OVERVIEW: '/products/:id',
  PRODUCTS_INVENTORY: '/products/:id/inventory',
  PRODUCTS_ORDERS_RECORD: '/products/:id/orders-history',
  PRODUCTS_EDIT: '/products/:id/edit',

  PRODUCTS_PACKAGES: '/product-packages',
  PRODUCTS_PACKAGES_DETAILS: '/product-packages/:id',

  PRODUCTS_CATEGORIES: '/product-categories',
  PRODUCTS_CATEGORIES_ADD: '/product-categories/create',
  PRODUCTS_CATEGORIES_DETAILS: '/product-categories/:id',

  MARKET_SERVICES: '/market-services',
  MARKET_SERVICES_DETAILS: '/market-services/:id',

  USERS: '/users',
  USERS_ADD: '/users/add',
  USERS_VIEW: '/users/view/:id',
  USERS_PROFILE: '/users/profile',
  USERS_SETTINGS: '/users/settings',
  USERS_PERMISSIONS: '/users/permissions',

  LOCATIONS: '/locations',
  LOCATIONS_ADD: '/locations/add',
  LOCATIONS_VIEW: '/locations/view/:id',
} as const;

export type AppRoutes = typeof routePaths;
export type AppRouteKey = keyof AppRoutes;
export type AppRoutePath = AppRoutes[AppRouteKey];
