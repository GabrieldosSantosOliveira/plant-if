import { env } from '@/constants/env'
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { randomUUID } from 'expo-crypto'
import { createContext, ReactNode, FC, useEffect } from 'react'
import { Platform } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'
export interface AuthContextProps {
  promptSingInWithGoogle(): Promise<void>
  promptSingInWithApple(): Promise<void>
  promptSingInWithFacebook(): Promise<void>
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
  const promptSingInWithApple = async () => {
    if (Platform.OS === 'ios') {
      await promptSingInWithAppleIos()
    } else if (Platform.OS === 'android') {
      await promptSingInWithAppleAndroid()
    }
  }
  const promptSingInWithFacebook = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ])

    if (result.grantedPermissions) {
      const accessToken = await AccessToken.getCurrentAccessToken()
    }
  }

  async function promptSingInWithAppleAndroid() {
    const rawNonce = randomUUID()
    const state = randomUUID()
    appleAuthAndroid.configure({
      clientId: env.APPLE_CLIENT_ID,
      redirectUri: env.APPLE_REDIRECT_URI,
      responseType: appleAuthAndroid.ResponseType.ALL,
      scope: appleAuthAndroid.Scope.ALL,
      nonce: rawNonce,
      state,
    })
    const response = await appleAuthAndroid.signIn()
  }
  async function promptSingInWithAppleIos() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    })

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    )
    if (credentialState === appleAuth.State.AUTHORIZED) {
    }
  }
  const promptSingInWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    await GoogleSignin.signIn()
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
        promptSingInWithApple,
        promptSingInWithFacebook,
        promptSingInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
