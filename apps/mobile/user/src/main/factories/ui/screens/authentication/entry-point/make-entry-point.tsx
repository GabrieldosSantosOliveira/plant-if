import { MakeAuthWithFacebookUseCase } from '@/main/factories/data/use-cases/auth/make-auth-with-facebook-use-case'
import { MakeAuthWithGoogleUseCase } from '@/main/factories/data/use-cases/auth/make-auth-with-google-use-case'
import { EntryPoint } from '@/ui/screens/authentication/entry-point/entry-point'

export const MakeEntryPoint = () => {
  return (
    <EntryPoint
      authWithFacebookUseCase={MakeAuthWithFacebookUseCase()}
      authWithGoogleUseCase={MakeAuthWithGoogleUseCase()}
    />
  )
}
