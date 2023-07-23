import { StorageContext } from '@/ui/contexts/storage-context'
import { useContext } from 'react'

import { WithoutProviderError } from './errors/without-provider-error'
export const useStorage = () => {
  const value = useContext(StorageContext)
  if (Object.keys(value).length === 0) {
    throw new WithoutProviderError(
      'useStorage must be used within an StorageProvider',
    )
  }
  return value
}
