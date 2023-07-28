import { Routes } from '@/main/routes'
import { Loading } from '@/ui/components/loading'
import { StatusBar } from '@/ui/components/status-bar'
import { AuthProvider } from '@/ui/contexts/auth-context'
import { ColorModeProvider } from '@/ui/contexts/color-mode-context'
import { HttpClientProvider } from '@/ui/contexts/http-client-context'
import { StorageProvider } from '@/ui/contexts/storage-context'
import { ToastProvider } from '@/ui/contexts/toast-context'
import {
  Poppins_400Regular,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins'
import React from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function App() {
  const [isFontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_300Light,
  })
  return (
    <ToastProvider>
      <StorageProvider>
        <SafeAreaView style={styles.container}>
          <ColorModeProvider>
            <HttpClientProvider>
              <GestureHandlerRootView style={styles.container}>
                <AuthProvider>
                  <StatusBar />
                  {isFontsLoaded ? <Routes /> : <Loading />}
                </AuthProvider>
              </GestureHandlerRootView>
            </HttpClientProvider>
          </ColorModeProvider>
        </SafeAreaView>
      </StorageProvider>
    </ToastProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
