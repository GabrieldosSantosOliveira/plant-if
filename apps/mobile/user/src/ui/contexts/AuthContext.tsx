import { env } from '@/constants/env'
import { keys } from '@/constants/keys'
import { UserDto } from '@/models/UserDto'
import { SingInWithFacebookService } from '@/services/SingInWithFacebookService'
import { SingInWithGoogleService } from '@/services/SingInWithGoogleService'
import { useHttpService } from '@/ui/hooks/useHttpService'
import { useStorage } from '@/ui/hooks/useStorage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React, { createContext, ReactNode, FC, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'
export interface AuthContextProps {
  promptSingInWithGoogle(): Promise<void>
  promptSingInWithFacebook(): Promise<void>
  user: UserDto | null
}
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
)
export interface AuthProviderProps {
  children: ReactNode
}
const CLIENT_ID =
  Platform.OS === 'ios'
    ? env.GOOGLE_CLIENT_ID_IOS
    : env.GOOGLE_CLIENT_ID_ANDROID

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { httpService } = useHttpService()
  const { storage } = useStorage()
  const [user, setUser] = useState<UserDto | null>(null)
  const singInWithFacebookService = new SingInWithFacebookService(httpService)
  const singInWithGoogleService = new SingInWithGoogleService(httpService)
  const promptSingInWithFacebook = async () => {
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
        storage.setItem(keys.ACCESS_TOKEN, data.accessToken),
        storage.setItem(keys.REFRESH_TOKEN, data.refreshToken),
      ])
    }
  }

  const promptSingInWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    await GoogleSignin.signIn()
    const { accessToken } = await GoogleSignin.getTokens()
    const { data } = await singInWithGoogleService.singIn(accessToken)
    setUser(data.user)
    await Promise.all([
      storage.setItem(keys.ACCESS_TOKEN, data.accessToken),
      storage.setItem(keys.REFRESH_TOKEN, data.refreshToken),
    ])
  }
  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,
      iosClientId: env.GOOGLE_CLIENT_ID_IOS,
      webClientId: CLIENT_ID,
    })
  }, [])
  return (
    <AuthContext.Provider
      value={{
        promptSingInWithFacebook,
        promptSingInWithGoogle,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
