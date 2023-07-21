import { keys } from '@/constants/keys'
import { HttpClient } from '@/interfaces/http/HttpClient'
import { SecureStorage } from '@/interfaces/storage/SecureStorage'
import { SingInWithFacebookService } from '@/services/SingInWithFacebookService'
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication'
import { randomUUID } from 'expo-crypto'
import { useState } from 'react'
import { Platform } from 'react-native'

import { useAuth } from './useAuth'
export interface UseAuthWithGoogleProps {
  secureStorage: SecureStorage
  httpClient: HttpClient
}
export const useAuthWithApple = ({
  httpClient,
  secureStorage,
}: UseAuthWithGoogleProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setUser } = useAuth()
  const singInWithFacebookService = new SingInWithFacebookService(httpClient)

  const promptAsyncIos = async () => {
    try {
      setIsLoading(true)
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      })

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      )

      if (
        credentialState === appleAuth.State.AUTHORIZED &&
        appleAuthRequestResponse.authorizationCode
      ) {
        const { data } = await singInWithFacebookService.singIn(
          appleAuthRequestResponse.authorizationCode,
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
  const promptAsyncAndroid = async () => {
    try {
      setIsLoading(true)
      // Generate secure, random values for state and nonce
      const rawNonce = randomUUID()
      const state = randomUUID()

      // Configure the request
      appleAuthAndroid.configure({
        clientId: 'com.example.client-android',
        redirectUri: 'https://example.com/auth/callback',
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
      })

      // Open the browser window for user sign in
      const response = await appleAuthAndroid.signIn()

      const { data } = await singInWithFacebookService.singIn(response.code)
      setUser(data.user)
      await Promise.all([
        secureStorage.setItem(keys.ACCESS_TOKEN, data.accessToken),
        secureStorage.setItem(keys.REFRESH_TOKEN, data.refreshToken),
      ])
    } finally {
      setIsLoading(false)
    }
  }
  return {
    promptAsync: Platform.OS === 'ios' ? promptAsyncIos : promptAsyncAndroid,
    isLoading,
  }
}
