import { Exception } from '@/domain/use-cases/errors/exception'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import {
  CreateUserWithAppleUseCase,
  CreateUserWithAppleUseCaseRequest,
  CreateUserWithAppleUseCaseResponse,
} from '@/domain/use-cases/user/create-user-with-apple-use-case'
import { Either, left, right } from '@/shared/either'
import { makeUser } from '@/test/domain/factories/make-user'

export class CreateUserWithAppleUseCaseMock
  implements CreateUserWithAppleUseCase
{
  public request: CreateUserWithAppleUseCaseRequest
  public response: CreateUserWithAppleUseCaseResponse
  async handle(
    request: CreateUserWithAppleUseCaseRequest,
  ): Promise<Either<Exception, CreateUserWithAppleUseCaseResponse>> {
    this.request = request
    this.response = {
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
      user: makeUser(),
    }
    return right(this.response)
  }
}
export const makeCreateUserWithAppleUseCaseMock = () => {
  const createUserWithAppleUseCaseMock = new CreateUserWithAppleUseCaseMock()
  return { createUserWithAppleUseCaseMock }
}
export class CreateUserWithAppleUseCaseMockWithError
  implements CreateUserWithAppleUseCase
{
  async handle(): Promise<
    Either<Exception, CreateUserWithAppleUseCaseResponse>
  > {
    throw new Error()
  }
}
export const makeCreateUserWithAppleUseCaseMockWithError = () => {
  const createUserWithAppleUseCaseMockWithError =
    new CreateUserWithAppleUseCaseMockWithError()
  return { createUserWithAppleUseCaseMockWithError }
}
export class CreateUserWithAppleUseCaseMockWithException
  implements CreateUserWithAppleUseCase
{
  async handle(): Promise<
    Either<Exception, CreateUserWithAppleUseCaseResponse>
  > {
    return left(new UnauthorizedException())
  }
}
export const makeCreateUserWithAppleUseCaseMockWithException = () => {
  const createUserWithAppleUseCaseMockWithException =
    new CreateUserWithAppleUseCaseMockWithException()
  return { createUserWithAppleUseCaseMockWithException }
}
