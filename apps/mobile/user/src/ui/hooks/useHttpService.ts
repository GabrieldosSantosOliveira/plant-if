import { WithoutProviderError } from '@/errors/WithoutProviderError'
import { HttpServiceContext } from '@/ui/contexts/HttpServiceContext'
import { useContext } from 'react'
export const useHttpService = () => {
  const value = useContext(HttpServiceContext)
  if (Object.keys(value).length === 0) {
    throw new WithoutProviderError(
      'useHttpService must be used within an HttpServiceProvider',
    )
  }
  return value
}
