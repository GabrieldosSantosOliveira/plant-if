import {
  CreateUserWithFacebookUseCase,
  CreateUserWithFacebookUseCaseRequest,
  CreateUserWithFacebookUseCaseResponse,
} from '@/interfaces/use-cases/user/create-user-with-facebook-use-case'
import { UnauthorizedException } from '@/presentation/errors/exceptions/unauthorized-exception'
import { makeUser } from '@/test/app/factories/make-user'

export class CreateUserWithFacebookUseCaseMock
  implements CreateUserWithFacebookUseCase
{
  public request: CreateUserWithFacebookUseCaseRequest
  public response: CreateUserWithFacebookUseCaseResponse
  async handle(
    request: CreateUserWithFacebookUseCaseRequest,
  ): Promise<CreateUserWithFacebookUseCaseResponse> {
    this.request = request
    this.response = {
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
      user: makeUser(),
    }
    return this.response
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
  async handle(
    request: CreateUserWithFacebookUseCaseRequest,
  ): Promise<CreateUserWithFacebookUseCaseResponse> {
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
  async handle(): Promise<CreateUserWithFacebookUseCaseResponse> {
    throw new UnauthorizedException()
  }
}
export const makeCreateUserWithFacebookUseCaseMockWithException = () => {
  const createUserWithFacebookUseCaseMockWithException =
    new CreateUserWithFacebookUseCaseMockWithException()
  return { createUserWithFacebookUseCaseMockWithException }
}
