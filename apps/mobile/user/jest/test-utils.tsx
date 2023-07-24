import { AuthProvider } from '@/ui/contexts/auth-context'
import { ColorModeProvider } from '@/ui/contexts/color-mode-context'
import { HttpClientProvider } from '@/ui/contexts/http-client-context'
import { StorageProvider } from '@/ui/contexts/storage-context'
import { ToastProvider } from '@/ui/contexts/toast-context'
import { NavigationContainer } from '@react-navigation/native'
import { render, RenderOptions } from '@testing-library/react-native'
import { ReactNode, FC, ReactElement } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
export interface AllTheProvidersProps {
  children: ReactNode
}
export const AllTheProviders: FC<AllTheProvidersProps> = ({ children }) => {
  return (
    <GestureHandlerRootView>
      <ToastProvider>
        <HttpClientProvider>
          <StorageProvider>
            <AuthProvider>
              <ColorModeProvider>
                <NavigationContainer>{children}</NavigationContainer>
              </ColorModeProvider>
            </AuthProvider>
          </StorageProvider>
        </HttpClientProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  )
}

function customRender<T>(ui: ReactElement<T>, options?: RenderOptions) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

export * from '@testing-library/react-native'

export { customRender as render }
