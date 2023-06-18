/* eslint-disable react-hooks/exhaustive-deps */
import { keys } from '@/constants/keys'
import { useStorage } from '@/hooks/useStorage'
import { ThemeDark, ThemeLight } from '@/styles/theme'
import { ThemeProvider } from '@shopify/restyle'
import { ReactNode, createContext, FC, useState, useEffect } from 'react'
import { Appearance, useColorScheme } from 'react-native'
export type ThemeType = 'light' | 'dark'
export type ColorModeType = 'light' | 'dark' | 'automatic'
export interface ColorModeContextProps {
  theme: ThemeType
  colorMode: ColorModeType
  changeColorModeToDark(): Promise<void>
  changeColorModeToLight(): Promise<void>
  changeColorModeToAutomatic(): Promise<void>
}
export const ColorModeContext = createContext<ColorModeContextProps>(
  {} as ColorModeContextProps,
)
export interface ColorModeProviderProps {
  children: ReactNode
}
export const ColorModeProvider: FC<ColorModeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light')
  const [colorMode, setColorMode] = useState<ColorModeType>('light')
  const colorScheme = useColorScheme()
  const { storage } = useStorage()
  Appearance.addChangeListener(({ colorScheme }) => {
    if (colorMode === 'automatic' && colorScheme) {
      setTheme(colorScheme)
    }
  })
  const changeColorModeToAutomatic = async () => {
    setColorMode('automatic')
    setTheme(colorScheme || 'dark')
    await storage.setItem<ColorModeType>(keys.COLOR_MODE, 'automatic')
  }
  const changeColorModeToDark = async () => {
    setTheme('dark')
    setColorMode('dark')
    await storage.setItem<ColorModeType>(keys.COLOR_MODE, 'dark')
  }
  const changeColorModeToLight = async () => {
    setTheme('light')
    setColorMode('light')
    await storage.setItem<ColorModeType>(keys.COLOR_MODE, 'light')
  }

  useEffect(() => {
    const loadThemeStorage = async () => {
      const colorModeSaveInStorage = await storage.getItem<ColorModeType>(
        keys.COLOR_MODE,
      )

      if (!colorModeSaveInStorage) {
        await changeColorModeToLight()
      } else if (colorModeSaveInStorage === 'automatic') {
        await changeColorModeToAutomatic()
      } else if (colorModeSaveInStorage === 'dark') {
        await changeColorModeToDark()
      } else if (colorModeSaveInStorage === 'light') {
        await changeColorModeToLight()
      }
    }
    loadThemeStorage()
  }, [])
  return (
    <ColorModeContext.Provider
      value={{
        theme,
        colorMode,
        changeColorModeToAutomatic,
        changeColorModeToDark,
        changeColorModeToLight,
      }}
    >
      <ThemeProvider theme={theme === 'dark' ? ThemeDark : ThemeLight}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
