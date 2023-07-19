import { WithoutProviderError } from '@/errors/WithoutProviderError'
import { StorageContext } from '@/ui/contexts/StorageContext'
import { useContext } from 'react'
export const useStorage = () => {
  const value = useContext(StorageContext)
  if (Object.keys(value).length === 0) {
    throw new WithoutProviderError(
      'useStorage must be used within an StorageProvider',
    )
  }
  return value
}
