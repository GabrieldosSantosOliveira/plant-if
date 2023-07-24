import {
  IsUserAlreadyExistsUseCase,
  IsUserAlreadyExistsUseCaseRequest,
  IsUserAlreadyExistsUseCaseResponse,
} from '@/domain/use-cases/user/is-user-already-exists-use-case'

export class IsUserAlreadyExistsUseCaseMock
  implements IsUserAlreadyExistsUseCase
{
  public request: IsUserAlreadyExistsUseCaseRequest
  public response: IsUserAlreadyExistsUseCaseResponse = {
    userExists: true,
    provider: 'email',
  }

  async handle(
    request: IsUserAlreadyExistsUseCaseRequest,
  ): Promise<IsUserAlreadyExistsUseCaseResponse> {
    this.request = request
    return this.response
  }
}
export const makeIsUserAlreadyExistsUseCaseMock = () => {
  const isUserAlreadyExistsUseCaseMock = new IsUserAlreadyExistsUseCaseMock()
  return { isUserAlreadyExistsUseCaseMock }
}
export class IsUserAlreadyExistsUseCaseMockWithError
  implements IsUserAlreadyExistsUseCase
{
  async handle(): Promise<IsUserAlreadyExistsUseCaseResponse> {
    throw new Error()
  }
}
export const makeIsUserAlreadyExistsUseCaseMockWithError = () => {
  const isUserAlreadyExistsUseCaseMockWithError =
    new IsUserAlreadyExistsUseCaseMockWithError()
  return { isUserAlreadyExistsUseCaseMockWithError }
}
