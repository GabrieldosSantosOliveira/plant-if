import type { AuthRoutes } from '@/@types/navigation'
import { createStackNavigator } from '@react-navigation/stack'

import { MakeLogin } from '../factories/ui/screens/authentication/login/make-login'
import { MakeOnboarding } from '../factories/ui/screens/authentication/onboarding/make-onboarding'
import { MakeSingUp } from '../factories/ui/screens/authentication/sing-up/make-sing-up'

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
      <AuthenticationStack.Screen name="Login" component={MakeLogin} />
      <AuthenticationStack.Screen name="SingUp" component={MakeSingUp} />
      <AuthenticationStack.Screen
        name="ForgotPassword"
        component={MakeSingUp}
      />
      <AuthenticationStack.Screen name="ResetPassword" component={MakeSingUp} />
    </AuthenticationStack.Navigator>
  )
}
