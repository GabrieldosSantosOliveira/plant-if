import { AuthProvider } from '@/ui/contexts/AuthContext'
import { ColorModeProvider } from '@/ui/contexts/ColorModeContext'
import { HttpServiceProvider } from '@/ui/contexts/HttpServiceContext'
import { StorageProvider } from '@/ui/contexts/StorageContext'
import { NavigationContainer } from '@react-navigation/native'
import { render, RenderOptions } from '@testing-library/react-native'
import { ReactNode, FC, ReactElement } from 'react'
export interface AllTheProvidersProps {
  children: ReactNode
}
export const AllTheProviders: FC<AllTheProvidersProps> = ({ children }) => {
  return (
    <NavigationContainer>
      <HttpServiceProvider>
        <StorageProvider>
          <AuthProvider>
            <ColorModeProvider>{children}</ColorModeProvider>
          </AuthProvider>
        </StorageProvider>
      </HttpServiceProvider>
    </NavigationContainer>
  )
}

function customRender<T>(ui: ReactElement<T>, options?: RenderOptions) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

export * from '@testing-library/react-native'

export { customRender as render }
