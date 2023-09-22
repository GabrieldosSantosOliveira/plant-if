import { useAuth } from '@/ui/hooks/use-auth'
import { useColorMode } from '@/ui/hooks/use-color-mode'
import { useTheme } from '@/ui/hooks/use-theme'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { AppRoutesNavigator } from './app.routes'
import { AuthenticationNavigator } from './auth-routes'

export const Routes = () => {
  const { user } = useAuth()
  const { colors } = useTheme()
  const { theme } = useColorMode()
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: colors['main-background'],
          border: colors['button-border'],
          card: colors['main-background'],
          primary: colors['main-background'],
          notification: colors['main-background'],
          text: colors['text-primary'],
        },
        dark: theme === 'dark',
      }}
    >
      {user ? <AppRoutesNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  )
}
