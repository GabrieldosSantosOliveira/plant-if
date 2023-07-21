import type { AuthRoutes } from '@/@types/navigation'
import { Dashboard } from '@/ui/screens/Authentication/Dashboard'
import { SingUp } from '@/ui/screens/Authentication/SingUp/SingUp'
import { createStackNavigator } from '@react-navigation/stack'

import { MakeEntryPoint } from '../factories/ui/screens/Authentication/EntryPoint/MakeEntryPoint'
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
      <AuthenticationStack.Screen name="SingUp" component={SingUp} />
      <AuthenticationStack.Screen name="ForgotPassword" component={Dashboard} />
      <AuthenticationStack.Screen
        name="EntryPoint"
        component={MakeEntryPoint}
      />
    </AuthenticationStack.Navigator>
  )
}
