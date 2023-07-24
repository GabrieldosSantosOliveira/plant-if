import { Exception } from '@/domain/use-cases/errors/exception'
import { UserAlreadyExistsException } from '@/domain/use-cases/errors/user-already-exists-exception'
import {
  CreateUserWithEmailUseCase,
  CreateUserWithEmailUseCaseResponse,
} from '@/domain/use-cases/user/create-user-with-email-use-case'
import { Either, left, right } from '@/shared/either'
import { makeUser } from '@/test/domain/factories/make-user'

export class CreateUserWithEmailUseCaseMock
  implements CreateUserWithEmailUseCase
{
  async handle(): Promise<
    Either<Exception, CreateUserWithEmailUseCaseResponse>
  > {
    return right({
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
      user: makeUser(),
    })
  }
}
export const makeCreateUserWithEmailUseCaseMock = () => {
  const createUserWithEmailUseCaseMock = new CreateUserWithEmailUseCaseMock()
  return { createUserWithEmailUseCaseMock }
}

export class CreateUserWithEmailUseCaseMockWithError
  implements CreateUserWithEmailUseCase
{
  async handle(): Promise<
    Either<Exception, CreateUserWithEmailUseCaseResponse>
  > {
    throw new Error()
  }
}
export const makeCreateUserWithEmailUseCaseMockWithError = () => {
  const createUserWithEmailUseCaseMockWithError =
    new CreateUserWithEmailUseCaseMockWithError()
  return { createUserWithEmailUseCaseMockWithError }
}
export class CreateUserWithEmailUseCaseMockWithException
  implements CreateUserWithEmailUseCase
{
  async handle(): Promise<
    Either<Exception, CreateUserWithEmailUseCaseResponse>
  > {
    return left(new UserAlreadyExistsException())
  }
}
export const makeCreateUserWithEmailUseCaseMockWithException = () => {
  const createUserWithEmailUseCaseMockWithException =
    new CreateUserWithEmailUseCaseMockWithException()
  return { createUserWithEmailUseCaseMockWithException }
}
