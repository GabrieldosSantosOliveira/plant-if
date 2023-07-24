/* eslint-disable react/no-unstable-nested-components */
import { AuthRoutes } from '@/@types/navigation'
import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case'
import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case'
import { Icons } from '@/ui/components/icons/icons'
import { Box } from '@/ui/components/shared/box'
import { useAuthWithFacebook } from '@/ui/hooks/use-auth-with-facebook'
import { useAuthWithGoogle } from '@/ui/hooks/use-auth-with-google'
import { useRoute, RouteProp } from '@react-navigation/native'

import { LoginButton } from '../components/login-button'

export type SingInParam = Pick<AuthRoutes, 'SingIn'>
export interface SingInProps {
  authWithGoogleUseCase: AuthWithGoogleUseCase
  authWithFacebookUseCase: AuthWithFacebookUseCase
}
export const SingIn: React.FC<SingInProps> = ({
  authWithGoogleUseCase,
  authWithFacebookUseCase,
}) => {
  const { params } = useRoute<RouteProp<SingInParam>>()
  const authWithGoogle = useAuthWithGoogle({
    authWithGoogleUseCase,
  })
  const authWithFacebook = useAuthWithFacebook({
    authWithFacebookUseCase,
  })
  const AuthLogin = {
    facebook: () => (
      <LoginButton
        title="Continuar com o Facebook"
        icon={<Icons.facebook />}
        onPress={authWithFacebook.promptAsync}
        isLoading={authWithFacebook.isLoading}
      />
    ),
    google: () => (
      <LoginButton
        title="Continuar com o Google"
        icon={<Icons.google />}
        onPress={authWithGoogle.promptAsync}
        isLoading={authWithGoogle.isLoading}
      />
    ),
  }
  params.provider
  const AuthProvider =
    params.provider !== 'email' && params.provider
      ? AuthLogin[params.provider]
      : null
  return (
    <Box
      flex={1}
      paddingVertical="lg"
      paddingHorizontal="2xl"
      backgroundColor="main-background"
    >
      {AuthProvider !== null ? <AuthProvider /> : null}
    </Box>
  )
}
