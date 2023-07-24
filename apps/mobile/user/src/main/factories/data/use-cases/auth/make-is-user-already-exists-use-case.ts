import { IsUserAlreadyExistsUseCaseImpl } from '@/data/use-cases/auth/is-user-already-exists-use-case-impl'
import { MakeHttpClient } from '@/main/factories/infra/http/make-http-client'

export const MakeIsUserAlreadyExistsUseCase = () =>
  new IsUserAlreadyExistsUseCaseImpl(MakeHttpClient())
