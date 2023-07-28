import { Exception } from '@/domain/use-cases/errors/exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import {
  AuthenticateUserWithEmailUseCase,
  AuthenticateUserWithEmailUseCaseResponse,
} from '@/domain/use-cases/user/authenticate-user-with-email-use-case'
import { Either, left, right } from '@/shared/either'
import { makeUser } from '@/test/domain/factories/make-user'

export class AuthenticateUserWithEmailUseCaseMock
  implements AuthenticateUserWithEmailUseCase
{
  async handle(): Promise<
    Either<Exception, AuthenticateUserWithEmailUseCaseResponse>
  > {
    return right({
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
      user: makeUser(),
    })
  }
}
export const makeAuthenticateUserWithEmailUseCaseMock = () => {
  const authenticateUserWithEmailUseCaseMock =
    new AuthenticateUserWithEmailUseCaseMock()
  return { authenticateUserWithEmailUseCaseMock }
}

export class AuthenticateUserWithEmailUseCaseMockWithError
  implements AuthenticateUserWithEmailUseCase
{
  handle(): Promise<
    Either<Exception, AuthenticateUserWithEmailUseCaseResponse>
  > {
    throw new Error()
  }
}
export const makeAuthenticateUserWithEmailUseCaseMockWithError = () => {
  const authenticateUserWithEmailUseCaseMockWithError =
    new AuthenticateUserWithEmailUseCaseMockWithError()
  return { authenticateUserWithEmailUseCaseMockWithError }
}
export class AuthenticateUserWithEmailUseCaseMockWithException
  implements AuthenticateUserWithEmailUseCase
{
  async handle(): Promise<
    Either<Exception, AuthenticateUserWithEmailUseCaseResponse>
  > {
    return left(new UserNotFoundException())
  }
}
export const makeAuthenticateUserWithEmailUseCaseMockWithException = () => {
  const authenticateUserWithEmailUseCaseWithException =
    new AuthenticateUserWithEmailUseCaseMockWithException()
  return { authenticateUserWithEmailUseCaseWithException }
}
