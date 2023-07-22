import { User } from '@/domain/entities/user'
import { Either } from '@/shared/either'

import { Exception } from '../errors/exception'
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
  ): Promise<Either<Exception, CreateUserWithFacebookUseCaseResponse>>
}
