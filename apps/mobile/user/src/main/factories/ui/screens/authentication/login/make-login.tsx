import { MakeAuthWithFacebookUseCase } from '@/main/factories/data/use-cases/auth/make-auth-with-facebook-use-case'
import { MakeAuthWithGoogleUseCase } from '@/main/factories/data/use-cases/auth/make-auth-with-google-use-case'
import { Login } from '@/ui/screens/authentication/login/login'

export const MakeLogin = () => {
  return (
    <Login
      authWithFacebookUseCase={MakeAuthWithFacebookUseCase()}
      authWithGoogleUseCase={MakeAuthWithGoogleUseCase()}
    />
  )
}
