import { User } from '@/domain/entities/user'

export interface CreateUserWithAppleUseCaseRequest {
  code: string
  firstName?: string
  lastName?: string
  email: string
}
export interface CreateUserWithAppleUseCaseResponse {
  accessToken: string
  refreshToken: string
  user: User
}
export interface CreateUserWithAppleUseCase {
  handle(
    request: CreateUserWithAppleUseCaseRequest,
  ): Promise<CreateUserWithAppleUseCaseResponse>
}
