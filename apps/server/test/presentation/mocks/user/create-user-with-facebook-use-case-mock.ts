import { Exception } from '@/domain/use-cases/errors/exception'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import {
  CreateUserWithFacebookUseCase,
  CreateUserWithFacebookUseCaseRequest,
  CreateUserWithFacebookUseCaseResponse,
} from '@/domain/use-cases/user/create-user-with-facebook-use-case'
import { Either, left, right } from '@/shared/either'
import { makeUser } from '@/test/domain/factories/make-user'

export class CreateUserWithFacebookUseCaseMock
  implements CreateUserWithFacebookUseCase
{
  public request: CreateUserWithFacebookUseCaseRequest
  public response: CreateUserWithFacebookUseCaseResponse
  async handle(
    request: CreateUserWithFacebookUseCaseRequest,
  ): Promise<Either<Exception, CreateUserWithFacebookUseCaseResponse>> {
    this.request = request
    this.response = {
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
      user: makeUser(),
    }
    return right(this.response)
  }
}
export const makeCreateUserWithFacebookUseCaseMock = () => {
  const createUserWithFacebookUseCaseMock =
    new CreateUserWithFacebookUseCaseMock()
  return { createUserWithFacebookUseCaseMock }
}
export class CreateUserWithFacebookUseCaseMockWithError
  implements CreateUserWithFacebookUseCase
{
  async handle(): Promise<
    Either<Exception, CreateUserWithFacebookUseCaseResponse>
  > {
    throw new Error()
  }
}
export const makeCreateUserWithFacebookUseCaseMockWithError = () => {
  const createUserWithFacebookUseCaseMockWithError =
    new CreateUserWithFacebookUseCaseMockWithError()
  return { createUserWithFacebookUseCaseMockWithError }
}
export class CreateUserWithFacebookUseCaseMockWithException
  implements CreateUserWithFacebookUseCase
{
  async handle(): Promise<
    Either<Exception, CreateUserWithFacebookUseCaseResponse>
  > {
    return left(new UnauthorizedException())
  }
}
export const makeCreateUserWithFacebookUseCaseMockWithException = () => {
  const createUserWithFacebookUseCaseMockWithException =
    new CreateUserWithFacebookUseCaseMockWithException()
  return { createUserWithFacebookUseCaseMockWithException }
}
