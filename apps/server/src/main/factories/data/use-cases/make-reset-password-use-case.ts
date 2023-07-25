import { ResetPasswordUseCaseImpl } from '@/data/use-cases/user/reset-password-use-case-impl'

import { makeHasher } from '../../infra/cryptography/make-hasher'
import { makeLoadUserByEmailRepository } from '../../infra/database/repositories/make-load-user-by-email-repository'
import { makeUpdateUserRepository } from '../../infra/database/repositories/make-update-user-repository'

export const makeResetPasswordUseCase = () =>
  new ResetPasswordUseCaseImpl(
    makeLoadUserByEmailRepository(),
    makeUpdateUserRepository(),
    makeHasher(),
  )
