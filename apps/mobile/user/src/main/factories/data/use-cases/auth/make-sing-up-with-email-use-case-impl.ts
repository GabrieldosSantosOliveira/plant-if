import { SingUpWithEmailUseCaseImpl } from '@/data/use-cases/auth/sing-up-with-email-use-case-impl'
import { MakeSingUpWithEmailRepository } from '@/main/factories/infra/data-source/repositories/auth/make-sing-up-with-email-repository-impl'
import { MakeSecureStorage } from '@/main/factories/infra/storage/make-secure-storage'

export const MakeSingUpWithEmailUseCase = () =>
  new SingUpWithEmailUseCaseImpl(
    MakeSingUpWithEmailRepository(),
    MakeSecureStorage(),
  )
