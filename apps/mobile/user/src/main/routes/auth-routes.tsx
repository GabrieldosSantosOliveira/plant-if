import type { AuthRoutes } from '@/@types/navigation'
import { createStackNavigator } from '@react-navigation/stack'

import { MakeLogin } from '../factories/ui/screens/authentication/login/make-login'
import { MakeOnboarding } from '../factories/ui/screens/authentication/onboarding/make-onboarding'
import { MakeSingUp } from '../factories/ui/screens/authentication/sing-up/make-sing-up'

const AuthenticationStack = createStackNavigator<AuthRoutes>()

export const AuthenticationNavigator: React.FC = () => {
  return (
    <AuthenticationStack.Navigator
      initialRouteName="onboarding"
      screenOptions={{ headerShown: false }}
    >
      <AuthenticationStack.Screen
        name="onboarding"
        component={MakeOnboarding}
      />
      <AuthenticationStack.Screen name="login" component={MakeLogin} />
      <AuthenticationStack.Screen name="sing-up" component={MakeSingUp} />
      <AuthenticationStack.Screen
        name="forgot-password"
        component={MakeSingUp}
      />
      <AuthenticationStack.Screen
        name="reset-password"
        component={MakeSingUp}
      />
    </AuthenticationStack.Navigator>
  )
}
