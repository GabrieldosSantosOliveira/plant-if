import {
  CreateUserWithGoogleUseCase,
  CreateUserWithGoogleUseCaseRequest,
  CreateUserWithGoogleUseCaseResponse,
} from '@/interfaces/use-cases/user/create-user-with-google-use-case'
import { UnauthorizedException } from '@/presentation/errors/exceptions/unauthorized-exception'
import { makeUser } from '@/test/app/factories/make-user'

export class CreateUserWithGoogleUseCaseMock
  implements CreateUserWithGoogleUseCase
{
  public request: CreateUserWithGoogleUseCaseRequest
  public response: CreateUserWithGoogleUseCaseResponse
  async handle(
    request: CreateUserWithGoogleUseCaseRequest,
  ): Promise<CreateUserWithGoogleUseCaseResponse> {
    this.request = request
    this.response = {
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
      user: makeUser(),
    }
    return this.response
  }
}
export const makeCreateUserWithGoogleUseCaseMock = () => {
  const createUserWithGoogleUseCaseMock = new CreateUserWithGoogleUseCaseMock()
  return { createUserWithGoogleUseCaseMock }
}
export class CreateUserWithGoogleUseCaseMockWithError
  implements CreateUserWithGoogleUseCase
{
  async handle(
    request: CreateUserWithGoogleUseCaseRequest,
  ): Promise<CreateUserWithGoogleUseCaseResponse> {
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
  async handle(): Promise<CreateUserWithGoogleUseCaseResponse> {
    throw new UnauthorizedException()
  }
}
export const makeCreateUserWithGoogleUseCaseMockWithException = () => {
  const createUserWithGoogleUseCaseMockWithException =
    new CreateUserWithGoogleUseCaseMockWithException()
  return { createUserWithGoogleUseCaseMockWithException }
}
