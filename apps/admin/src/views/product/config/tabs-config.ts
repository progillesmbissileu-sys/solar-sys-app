export const productManageTabs = (productId: string) => [
  { title: 'Overview', href: `/products/${productId}` },
  { title: 'Orders', href: `/products/${productId}/orders-history` },
  { title: 'Inventory', href: `/products/${productId}/inventory` },
];

export const productPackManageTabs = (packId: string) => [
  { title: 'Overview', href: `/product-packages/${packId}` },
  { title: 'Orders', href: `/product-packages/${packId}/orders` },
];
