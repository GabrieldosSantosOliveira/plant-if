import { AuthRecoverySessionUseCaseImpl } from '@/data/use-cases/auth/auth-recovery-session-use-case-impl'
import { MakeSecureStorage } from '@/main/factories/infra/storage/make-secure-storage'

export const MakeAuthRecoverySessionUseCase = () =>
  new AuthRecoverySessionUseCaseImpl(MakeSecureStorage())
