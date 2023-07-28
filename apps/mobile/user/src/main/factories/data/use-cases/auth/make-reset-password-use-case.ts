import { ResetPasswordUseCaseImpl } from '@/data/use-cases/auth/reset-password-use-case-impl'
import { MakeResetPasswordRepository } from '@/main/factories/infra/data-source/repositories/auth/make-reset-password-repository'

export const MakeResetPasswordUseCase = () =>
  new ResetPasswordUseCaseImpl(MakeResetPasswordRepository())
