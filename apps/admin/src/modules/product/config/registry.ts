import { CategoryFormPanel } from '../ui/panels/CategoryFormPanel';

export const PANEL_TYPES = {
  CATEGORY_FORM: 'category-form',
} as const;

export const panelRegistry = {
  [PANEL_TYPES.CATEGORY_FORM]: CategoryFormPanel,
};
