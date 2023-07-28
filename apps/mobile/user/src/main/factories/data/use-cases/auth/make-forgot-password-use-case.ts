import { ForgotPasswordUseCaseImpl } from '@/data/use-cases/auth/forgot-password-use-case-impl'
import { MakeForgotPasswordRepository } from '@/main/factories/infra/data-source/repositories/auth/make-forgot-password-repository'

export const MakeForgotPasswordUseCase = () =>
  new ForgotPasswordUseCaseImpl(MakeForgotPasswordRepository())
