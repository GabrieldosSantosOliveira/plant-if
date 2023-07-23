import type { AuthRoutes } from '@/@types/navigation'
import { Dashboard } from '@/ui/screens/authentication/dashboard'
import { SingUp } from '@/ui/screens/authentication/sing-up/sing-up'
import { createStackNavigator } from '@react-navigation/stack'

import { MakeEntryPoint } from '../factories/ui/screens/authentication/entry-point/make-entry-point'
import { MakeOnboarding } from '../factories/ui/screens/authentication/onboarding/make-onboarding'

const AuthenticationStack = createStackNavigator<AuthRoutes>()

export const AuthenticationNavigator: React.FC = () => {
  return (
    <AuthenticationStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <AuthenticationStack.Screen
        name="Onboarding"
        component={MakeOnboarding}
      />
      <AuthenticationStack.Screen name="SingIn" component={Dashboard} />
      <AuthenticationStack.Screen name="SingUp" component={SingUp} />
      <AuthenticationStack.Screen name="ForgotPassword" component={Dashboard} />
      <AuthenticationStack.Screen
        name="EntryPoint"
        component={MakeEntryPoint}
      />
    </AuthenticationStack.Navigator>
  )
}
