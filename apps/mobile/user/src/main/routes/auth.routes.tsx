import type { AuthRoutes } from '@/@types/navigation'
import { Dashboard } from '@/ui/screens/Authentication/Dashboard'
import { createStackNavigator } from '@react-navigation/stack'

import { MakeOnboarding } from '../factories/ui/screens/Authentication/Onboarding/MakeOnboarding'

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
      <AuthenticationStack.Screen name="SingUp" component={Dashboard} />
      <AuthenticationStack.Screen name="ForgotPassword" component={Dashboard} />
    </AuthenticationStack.Navigator>
  )
}
