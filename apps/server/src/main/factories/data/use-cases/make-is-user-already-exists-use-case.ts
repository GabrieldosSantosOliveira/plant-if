import { IsUserAlreadyExistsUseCaseImpl } from '@/data/use-cases/user/is-user-already-exists-use-case-impl'

import { makeLoadUserByEmailRepository } from '../../infra/database/repositories/make-load-user-by-email-repository'

export const makeIsUserAlreadyExistsUseCase = () =>
  new IsUserAlreadyExistsUseCaseImpl(makeLoadUserByEmailRepository())
