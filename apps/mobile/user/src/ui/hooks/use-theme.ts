import { useTheme as useThemeShopify } from '@shopify/restyle';

import { Theme } from '../styles/theme';
export const useTheme = () => useThemeShopify<Theme>();
