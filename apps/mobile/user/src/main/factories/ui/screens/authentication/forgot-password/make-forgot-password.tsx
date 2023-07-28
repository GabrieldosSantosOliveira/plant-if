import { MakeForgotPasswordUseCase } from '@/main/factories/data/use-cases/auth/make-forgot-password-use-case'
import { ForgotPassword } from '@/ui/screens/authentication/forgot-password/forgot-password'

export const MakeForgotPassword = () => {
  return <ForgotPassword forgotPasswordUseCase={MakeForgotPasswordUseCase()} />
}
