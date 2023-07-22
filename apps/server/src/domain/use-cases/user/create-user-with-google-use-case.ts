import { User } from '@/domain/entities/user'
import { Either } from '@/shared/either'

import { Exception } from '../errors/exception'
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
  ): Promise<Either<Exception, CreateUserWithGoogleUseCaseResponse>>
}
