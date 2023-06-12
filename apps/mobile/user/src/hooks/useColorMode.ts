import { ColorModeContext } from '@/contexts/ColorModeContext'
import { WithoutProviderError } from '@/errors/WithoutProviderError'
import { useContext } from 'react'
export const useColorMode = () => {
  const value = useContext(ColorModeContext)
  if (Object.keys(value).length === 0) {
    throw new WithoutProviderError(
      'useTheme must be used within an ThemeProvider',
    )
  }
  return value
}
