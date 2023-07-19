import { Loading } from '@/ui/components/Loading'
import { StatusBar } from '@/ui/components/StatusBar'
import { AuthProvider } from '@/ui/contexts/AuthContext'
import { ColorModeProvider } from '@/ui/contexts/ColorModeContext'
import { HttpServiceProvider } from '@/ui/contexts/HttpServiceContext'
import { StorageProvider } from '@/ui/contexts/StorageContext'
import { Dashboard } from '@/ui/screens/Dashboard/Dashboard'
import { Inter_500Medium } from '@expo-google-fonts/inter'
import {
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Inter_500Medium,
  })
  return (
    <StorageProvider>
      <SafeAreaView style={styles.container}>
        <ColorModeProvider>
          <HttpServiceProvider>
            <AuthProvider>
              <StatusBar />
              {isFontsLoaded ? <Dashboard /> : <Loading />}
            </AuthProvider>
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
