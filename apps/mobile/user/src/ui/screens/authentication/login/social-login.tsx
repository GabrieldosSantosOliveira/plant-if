import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case'
import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case'
import { Icons } from '@/ui/components/icons/icons'
import { Box } from '@/ui/components/shared/box'
import { useAuthWithFacebook } from '@/ui/hooks/use-auth-with-facebook'
import { useAuthWithGoogle } from '@/ui/hooks/use-auth-with-google'

import { LoginButton } from './../components/login-button'
export interface SocialLoginProps {
  authWithGoogleUseCase: AuthWithGoogleUseCase
  authWithFacebookUseCase: AuthWithFacebookUseCase
}
export const SocialLogin: React.FC<SocialLoginProps> = ({
  authWithFacebookUseCase,
  authWithGoogleUseCase,
}) => {
  const authWithGoogle = useAuthWithGoogle({
    authWithGoogleUseCase,
  })
  const authWithFacebook = useAuthWithFacebook({
    authWithFacebookUseCase,
  })
  return (
    <Box gap="md" flex={1} flexDirection="row" justifyContent="center">
      <LoginButton
        testID="button-sing-in-with-facebook"
        icon={<Icons.facebook />}
        onPress={authWithFacebook.promptAsync}
        isLoading={authWithFacebook.isLoading}
      />
      <LoginButton
        testID="button-sing-in-with-google"
        icon={<Icons.google />}
        onPress={authWithGoogle.promptAsync}
        isLoading={authWithGoogle.isLoading}
      />
    </Box>
  )
}
