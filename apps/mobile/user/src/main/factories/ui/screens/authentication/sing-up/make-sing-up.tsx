import { MakeAuthWithFacebookUseCase } from '@/main/factories/data/use-cases/auth/make-auth-with-facebook-use-case'
import { MakeAuthWithGoogleUseCase } from '@/main/factories/data/use-cases/auth/make-auth-with-google-use-case'
import { MakeSingUpWithEmailUseCase } from '@/main/factories/data/use-cases/auth/make-sing-up-with-email-use-case-impl'
import { SingUp } from '@/ui/screens/authentication/sing-up/sing-up'
export const MakeSingUp: React.FC = () => {
  return (
    <SingUp
      authWithFacebookUseCase={MakeAuthWithFacebookUseCase()}
      authWithGoogleUseCase={MakeAuthWithGoogleUseCase()}
      singUpWithEmailUseCase={MakeSingUpWithEmailUseCase()}
    />
  )
}
