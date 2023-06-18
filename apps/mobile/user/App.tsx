/* eslint-disable camelcase */
import { Loading } from '@/components/Loading'
import { StatusBar } from '@/components/StatusBar'
import { AuthProvider } from '@/contexts/AuthContext'
import { ColorModeProvider } from '@/contexts/ColorModeContext'
import { HttpServiceProvider } from '@/contexts/HttpServiceContext'
import { StorageProvider } from '@/contexts/StorageContext'
import { Dashboard } from '@/screens/Dashboard/Dashboard'
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
      <SafeAreaView style={{ flex: 1 }}>
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
