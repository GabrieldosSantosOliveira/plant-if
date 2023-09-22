import type { AppRoutes } from '@/@types/navigation'
import { Home } from '@/ui/screens/home/home'
import { createStackNavigator } from '@react-navigation/stack'

const AppRoutesNavigatorStack = createStackNavigator<AppRoutes>()

export const AppRoutesNavigator: React.FC = () => {
  return (
    <AppRoutesNavigatorStack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <AppRoutesNavigatorStack.Screen name="home" component={Home} />
    </AppRoutesNavigatorStack.Navigator>
  )
}
