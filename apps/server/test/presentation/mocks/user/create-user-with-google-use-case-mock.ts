import { Exception } from '@/domain/use-cases/errors/exception'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import {
  CreateUserWithGoogleUseCase,
  CreateUserWithGoogleUseCaseRequest,
  CreateUserWithGoogleUseCaseResponse,
} from '@/domain/use-cases/user/create-user-with-google-use-case'
import { Either, left, right } from '@/shared/either'
import { makeUser } from '@/test/domain/factories/make-user'

export class CreateUserWithGoogleUseCaseMock
  implements CreateUserWithGoogleUseCase
{
  public request: CreateUserWithGoogleUseCaseRequest
  public response: CreateUserWithGoogleUseCaseResponse
  async handle(
    request: CreateUserWithGoogleUseCaseRequest,
  ): Promise<Either<Exception, CreateUserWithGoogleUseCaseResponse>> {
    this.request = request
    this.response = {
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
      user: makeUser(),
    }
    return right(this.response)
  }
}
export const makeCreateUserWithGoogleUseCaseMock = () => {
  const createUserWithGoogleUseCaseMock = new CreateUserWithGoogleUseCaseMock()
  return { createUserWithGoogleUseCaseMock }
}
export class CreateUserWithGoogleUseCaseMockWithError
  implements CreateUserWithGoogleUseCase
{
  async handle(): Promise<
    Either<Exception, CreateUserWithGoogleUseCaseResponse>
  > {
    throw new Error()
  }
}
export const makeCreateUserWithGoogleUseCaseMockWithError = () => {
  const createUserWithGoogleUseCaseMockWithError =
    new CreateUserWithGoogleUseCaseMockWithError()
  return { createUserWithGoogleUseCaseMockWithError }
}
export class CreateUserWithGoogleUseCaseMockWithException
  implements CreateUserWithGoogleUseCase
{
  async handle(): Promise<
    Either<Exception, CreateUserWithGoogleUseCaseResponse>
  > {
    return left(new UnauthorizedException())
  }
}
export const makeCreateUserWithGoogleUseCaseMockWithException = () => {
  const createUserWithGoogleUseCaseMockWithException =
    new CreateUserWithGoogleUseCaseMockWithException()
  return { createUserWithGoogleUseCaseMockWithException }
}
