import { keys } from '@/constants/keys'
import { HttpClient } from '@/interfaces/http/HttpClient'
import { SecureStorage } from '@/interfaces/storage/SecureStorage'
import { SingInWithFacebookService } from '@/services/SingInWithFacebookService'
import { useState } from 'react'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'

import { useAuth } from './useAuth'
export interface UseAuthWithGoogleProps {
  secureStorage: SecureStorage
  httpClient: HttpClient
}
export const useAuthWithFacebook = ({
  httpClient,
  secureStorage,
}: UseAuthWithGoogleProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setUser } = useAuth()
  const singInWithFacebookService = new SingInWithFacebookService(httpClient)

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
        const { data } = await singInWithFacebookService.singIn(
          accessToken.accessToken,
        )
        setUser(data.user)
        await Promise.all([
          secureStorage.setItem(keys.ACCESS_TOKEN, data.accessToken),
          secureStorage.setItem(keys.REFRESH_TOKEN, data.refreshToken),
        ])
      }
    } finally {
      setIsLoading(false)
    }
  }
  return { promptAsync, isLoading }
}
