import { AuthProvider } from '@/ui/contexts/auth-context'
import { HttpClientProvider } from '@/ui/contexts/http-client-context'
import { StorageProvider } from '@/ui/contexts/storage-context'
import { ToastProvider } from '@/ui/contexts/toast-context'
import { NavigationContainer } from '@react-navigation/native'
import { render, RenderOptions } from '@testing-library/react-native'
import React, { ReactNode, FC, ReactElement } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { ColorModeMockMockProvider } from './mocks/color-mode-mock'
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
              <ColorModeMockMockProvider>
                <NavigationContainer>{children}</NavigationContainer>
              </ColorModeMockMockProvider>
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
