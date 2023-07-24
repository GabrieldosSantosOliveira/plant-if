import { Loading } from '@/ui/components/loading'
import { useAuth } from '@/ui/hooks/use-auth'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { AuthenticationNavigator } from './auth-routes'

export const Routes = () => {
  const { user } = useAuth()
  return (
    <NavigationContainer>
      {user ? <Loading /> : <AuthenticationNavigator />}
    </NavigationContainer>
  )
}
