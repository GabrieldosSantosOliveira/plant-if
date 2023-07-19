import { WithoutProviderError } from '@/errors/WithoutProviderError'
import { AuthContext } from '@/ui/contexts/AuthContext'
import { useContext } from 'react'
export const useAuth = () => {
  const value = useContext(AuthContext)
  if (Object.keys(value).length === 0) {
    throw new WithoutProviderError(
      'useAuth must be used within an AuthProvider',
    )
  }
  return value
}
