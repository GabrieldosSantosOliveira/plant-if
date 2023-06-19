import { User } from '@/app/entities/user'
export interface CreateUserWithFacebookUseCaseRequest {
  accessToken: string
}
export interface CreateUserWithFacebookUseCaseResponse {
  accessToken: string
  refreshToken: string
  user: User
}
export interface CreateUserWithFacebookUseCase {
  handle(
    request: CreateUserWithFacebookUseCaseRequest,
  ): Promise<CreateUserWithFacebookUseCaseResponse>
}
