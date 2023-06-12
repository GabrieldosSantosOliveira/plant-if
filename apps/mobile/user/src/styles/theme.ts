import { createTheme } from '@shopify/restyle'

import { palette } from './palette'

export const ThemeLight = createTheme({
  colors: {
    mainBackground: palette.green[50],
    textPrimary: palette.black,
    buttonBorder: palette.gray[500],
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: 'normal',
      fontSize: 18,
      lineHeight: 24,
      fontFamily: 'Inter_500Medium',
      color: 'textPrimary',
    },
    button: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 'normal',
      fontFamily: 'Roboto_400Regular',
      color: 'textPrimary',
    },
    defaults: {},
  },
  borderRadii: {},
  breakpoints: {},
  zIndices: {},
})
export const ThemeDark = createTheme({
  colors: {
    mainBackground: palette.blue[900],
    textPrimary: palette.white,
    buttonBorder: palette.gray[500],
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: 'normal',
      fontSize: 18,
      lineHeight: 24,
      fontFamily: 'Inter_500Medium',
      color: 'textPrimary',
    },

    button: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 'normal',
      fontFamily: 'Roboto_400Regular',
      color: 'textPrimary',
    },
    defaults: {},
  },
  borderRadii: {},
  breakpoints: {},
  zIndices: {},
})
export type Theme = typeof ThemeLight
