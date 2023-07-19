import { WithoutProviderError } from '@/errors/WithoutProviderError'
import { ColorModeContext } from '@/ui/contexts/ColorModeContext'
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
