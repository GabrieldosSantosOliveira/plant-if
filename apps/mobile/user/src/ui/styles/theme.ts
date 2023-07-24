import { createTheme } from '@shopify/restyle'

import { palette } from './palette'
const spacing = {
  none: 0,
  '2xs': 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
  '6xl': 40,
  '7xl': 44,
  '8xl': 48,
  '9xl': 52,
}
const zIndices = { 0: 0, 10: 10, 20: 20, 30: 30, 40: 40, 50: 50 }
const borderRadii = {
  'rounded-none': 0,
  'rounded-px': 1,
  'rounded-sm': 2,
  rounded: 4,
  'rounded-md': 6,
  'rounded-lg': 8,
  'rounded-xl': 12,
  'rounded-2xl': 16,
  'rounded-3xl': 24,
  'rounded-full': 9999,
}
export const ThemeLight = createTheme({
  colors: {
    'main-background': palette.green[50],
    'text-primary': palette.black,
    'text-secondary': palette.white,
    'button-border': palette.black,
    error: palette.red[500],
  },
  spacing,
  textVariants: {
    slide: {
      fontSize: 14,
      fontFamily: 'Poppins_400Regular',
      color: 'text-primary',
    },
    error: {
      fontSize: 14,
      fontFamily: 'Poppins_400Regular',
      color: 'error',
    },
    heading: {
      fontSize: 18,
      fontFamily: 'Poppins_500Medium',
      color: 'text-primary',
    },
    button: {
      fontSize: 14,
      fontFamily: 'Poppins_400Regular',
      color: 'text-primary',
    },
    input: {
      fontSize: 14,
      fontFamily: 'Poppins_400Regular',
      color: 'text-primary',
    },
    'input-label': {
      fontSize: 16,
      fontFamily: 'Poppins_400Regular',
      color: 'text-primary',
    },
    defaults: {},
  },
  borderRadii,
  breakpoints: {},
  zIndices,
})
export const ThemeDark = createTheme({
  colors: {
    'main-background': palette.blue[900],
    'text-primary': palette.white,
    'button-border': palette.gray[500],
    'text-secondary': palette.white,
  },
  spacing,
  textVariants: {
    slide: {
      fontWeight: 'normal',
      fontSize: 14,
      fontFamily: 'Poppins_400Regular',
      color: 'text-primary',
    },

    header: {
      fontWeight: 'normal',
      fontSize: 18,
      lineHeight: 24,
      fontFamily: 'Inter_500Medium',
      color: 'text-primary',
    },
    button: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 'normal',
      fontFamily: 'Roboto_400Regular',
      color: 'text-primary',
    },
    defaults: {},
  },
  borderRadii,
  breakpoints: {},
  zIndices,
})
export type Theme = typeof ThemeLight
