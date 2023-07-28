import { AuthUserWithEmailUseCaseImpl } from '@/data/use-cases/auth/auth-with-email-use-case-impl'
import { MakeAuthWithEmailRepository } from '@/main/factories/infra/data-source/repositories/auth/make-auth-with-email-repository'
import { MakeSecureStorage } from '@/main/factories/infra/storage/make-secure-storage'

export const MakeAuthUserWithEmailUseCase = () =>
  new AuthUserWithEmailUseCaseImpl(
    MakeAuthWithEmailRepository(),
    MakeSecureStorage(),
  )
