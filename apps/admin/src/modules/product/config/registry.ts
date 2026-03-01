import { CategoryFormPanel } from '../ui/panels/CategoryFormPanel';
import { ProductFormPanel } from '../ui/panels/ProductFormPanel';

export const PANEL_TYPES = {
  CATEGORY_FORM: 'category-form',
  PRODUCT_FORM: 'product-form',
} as const;

export const panelRegistry = {
  [PANEL_TYPES.CATEGORY_FORM]: CategoryFormPanel,
  [PANEL_TYPES.PRODUCT_FORM]: ProductFormPanel,
};
