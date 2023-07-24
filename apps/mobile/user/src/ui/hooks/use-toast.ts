import { useContext } from 'react'

import { ToastContext } from '../contexts/toast-context'
import { WithoutProviderError } from './errors/without-provider-error'
export const useToast = () => {
  const value = useContext(ToastContext)
  if (Object.keys(value).length === 0) {
    throw new WithoutProviderError(
      'useToast must be used within an ToastProvider',
    )
  }
  return value
}
