import { User } from '@/app/entities/user'
export interface CreateUserWithGoogleUseCaseRequest {
  accessToken: string
}
export interface CreateUserWithGoogleUseCaseResponse {
  accessToken: string
  refreshToken: string
  user: User
}
export interface CreateUserWithGoogleUseCase {
  handle(
    request: CreateUserWithGoogleUseCaseRequest,
  ): Promise<CreateUserWithGoogleUseCaseResponse>
}
