import { AuthenticationNavigator } from '@/main/routes/auth.routes'
import { Loading } from '@/ui/components/Loading'
import { StatusBar } from '@/ui/components/StatusBar'
import { AuthProvider } from '@/ui/contexts/AuthContext'
import { ColorModeProvider } from '@/ui/contexts/ColorModeContext'
import { HttpServiceProvider } from '@/ui/contexts/HttpServiceContext'
import { StorageProvider } from '@/ui/contexts/StorageContext'
import { Inter_500Medium } from '@expo-google-fonts/inter'
import {
  Poppins_400Regular,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
  useFonts,
} from '@expo-google-fonts/roboto'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Inter_500Medium,
    Poppins_400Regular,
    Poppins_300Light,
  })
  return (
    <StorageProvider>
      <SafeAreaView style={styles.container}>
        <ColorModeProvider>
          <HttpServiceProvider>
            <GestureHandlerRootView style={styles.container}>
              <AuthProvider>
                <StatusBar />
                {isFontsLoaded ? (
                  <NavigationContainer>
                    <AuthenticationNavigator />
                  </NavigationContainer>
                ) : (
                  <Loading />
                )}
              </AuthProvider>
            </GestureHandlerRootView>
          </HttpServiceProvider>
        </ColorModeProvider>
      </SafeAreaView>
    </StorageProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
