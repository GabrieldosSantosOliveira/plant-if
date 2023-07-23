import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case'
import { useState } from 'react'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'

import { useAuth } from './use-auth'
export interface UseAuthWithGoogleProps {
  authWithFacebookUseCase: AuthWithFacebookUseCase
}
export const useAuthWithFacebook = ({
  authWithFacebookUseCase,
}: UseAuthWithGoogleProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setUser } = useAuth()

  const promptAsync = async () => {
    try {
      setIsLoading(true)
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ])
      const accessToken = await AccessToken.getCurrentAccessToken()
      if (
        !result.isCancelled &&
        result.grantedPermissions?.includes('public_profile') &&
        result.grantedPermissions?.includes('email') &&
        accessToken
      ) {
        const response = await authWithFacebookUseCase.execute(
          accessToken.accessToken,
        )
        if (response.isRight()) {
          setUser(response.value)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }
  return { promptAsync, isLoading }
}
