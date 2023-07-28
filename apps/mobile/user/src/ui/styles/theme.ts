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
    'main-background': palette.white,
    'text-primary': 'rgb(49, 46, 73)',
    'text-secondary': palette.white,
    'button-border': palette.black,
    error: '#FF0058',
    'input-placeholder': 'rgba(0, 0, 0, 0.5)',
    'text-placeholder': '#747980',
    attention: '#2805FF',
    'input-stroke': '#A2A2A6',
    'social-stroke': '#EBE9F1',
    'icon-main': '#667085',
    'go-back-button': 'rgba(240, 240, 240, 1)',
  },
  spacing,
  textVariants: {
    checkbox: {
      color: 'text-placeholder',
      fontFamily: 'Poppins_500Medium',
      fontSize: 12,
    },
    'text-placeholder': {
      color: 'text-placeholder',
      fontFamily: 'Poppins_500Medium',
      fontSize: 12,
      fontStyle: 'normal',
    },
    slide: {
      fontSize: 14,
      fontFamily: 'Poppins_400Regular',
      color: 'text-primary',
    },
    error: {
      fontSize: 12,
      fontFamily: 'Poppins_600SemiBold',
      color: 'error',
    },
    heading: {
      fontSize: 28,
      fontFamily: 'Poppins_600SemiBold',
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
      fontSize: 14,
      fontFamily: 'Poppins_600SemiBold',
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
    'text-secondary': palette.black,
    error: '#FF0058',
    'input-placeholder': 'rgba(250, 250, 250, 0.5)',
    'text-placeholder': '#D8D8DD',
    attention: '#2805FF',
    'input-stroke': '#D8D8DD',
    'social-stroke': '#D8D8DD',
    'icon-main': '#D8D8DD',
    'go-back-button': 'rgba(8, 30, 38, 1)',
  },
  spacing,
  textVariants: {
    checkbox: {
      color: 'text-placeholder',
      fontFamily: 'Poppins_500Medium',
      fontSize: 12,
    },
    'text-placeholder': {
      color: 'text-placeholder',
      fontFamily: 'Poppins_500Medium',
      fontSize: 12,
      fontStyle: 'normal',
    },
    slide: {
      fontSize: 14,
      fontFamily: 'Poppins_400Regular',
      color: 'text-primary',
    },
    error: {
      fontSize: 12,
      fontFamily: 'Poppins_600SemiBold',
      color: 'error',
    },
    heading: {
      fontSize: 28,
      fontFamily: 'Poppins_600SemiBold',
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
      fontSize: 14,
      fontFamily: 'Poppins_600SemiBold',
      color: 'text-primary',
    },
    defaults: {},
  },
  borderRadii,
  breakpoints: {},
  zIndices,
})
export type Theme = typeof ThemeLight
