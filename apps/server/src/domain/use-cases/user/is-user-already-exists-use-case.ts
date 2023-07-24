import { UserProvider } from '@/domain/entities/user'

export interface IsUserAlreadyExistsUseCaseRequest {
  email: string
}
export interface IsUserAlreadyExistsUseCaseResponse {
  userExists: boolean
  provider?: UserProvider
}
export interface IsUserAlreadyExistsUseCase {
  handle(
    request: IsUserAlreadyExistsUseCaseRequest,
  ): Promise<IsUserAlreadyExistsUseCaseResponse>
}
