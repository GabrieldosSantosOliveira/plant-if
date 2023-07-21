import { keys } from '@/constants/keys'
import { HttpClient } from '@/interfaces/http/HttpClient'
import { SecureStorage } from '@/interfaces/storage/SecureStorage'
import { SingInWithGoogleService } from '@/services/SingInWithGoogleService'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'

import { env } from './../../constants/env'
import { useAuth } from './useAuth'
const CLIENT_ID =
  Platform.OS === 'ios'
    ? env.GOOGLE_CLIENT_ID_IOS
    : env.GOOGLE_CLIENT_ID_ANDROID
export interface UseAuthWithGoogleProps {
  secureStorage: SecureStorage
  httpClient: HttpClient
}
export const useAuthWithGoogle = ({
  httpClient,
  secureStorage,
}: UseAuthWithGoogleProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setUser } = useAuth()
  const singInWithGoogleService = new SingInWithGoogleService(httpClient)
  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,
      iosClientId: env.GOOGLE_CLIENT_ID_IOS,
      webClientId: CLIENT_ID,
    })
  }, [])
  const promptAsync = async () => {
    try {
      setIsLoading(true)
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      await GoogleSignin.signIn()
      const { accessToken } = await GoogleSignin.getTokens()
      const { data } = await singInWithGoogleService.singIn(accessToken)
      setUser(data.user)
      await Promise.all([
        secureStorage.setItem(keys.ACCESS_TOKEN, data.accessToken),
        secureStorage.setItem(keys.REFRESH_TOKEN, data.refreshToken),
      ])
    } finally {
      setIsLoading(false)
    }
  }
  return { promptAsync, isLoading }
}
