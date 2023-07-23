import { AuthProvider } from '@/ui/contexts/auth-context'
import { ColorModeProvider } from '@/ui/contexts/color-mode-context'
import { HttpClientProvider } from '@/ui/contexts/http-client-context'
import { StorageProvider } from '@/ui/contexts/storage-context'
import { NavigationContainer } from '@react-navigation/native'
import { render, RenderOptions } from '@testing-library/react-native'
import { ReactNode, FC, ReactElement } from 'react'
export interface AllTheProvidersProps {
  children: ReactNode
}
export const AllTheProviders: FC<AllTheProvidersProps> = ({ children }) => {
  return (
    <HttpClientProvider>
      <StorageProvider>
        <AuthProvider>
          <ColorModeProvider>
            <NavigationContainer>{children}</NavigationContainer>
          </ColorModeProvider>
        </AuthProvider>
      </StorageProvider>
    </HttpClientProvider>
  )
}

function customRender<T>(ui: ReactElement<T>, options?: RenderOptions) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

export * from '@testing-library/react-native'

export { customRender as render }
