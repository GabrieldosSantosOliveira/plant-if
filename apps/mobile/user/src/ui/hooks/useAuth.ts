import { AuthContext } from '@/contexts/AuthContext'
import { WithoutProviderError } from '@/errors/WithoutProviderError'
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
