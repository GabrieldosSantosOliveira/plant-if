import { User } from '@/domain/entities/user'
import { Either } from '@/shared/either'

import { Exception } from '../errors/exception'

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
  ): Promise<Either<Exception, CreateUserWithAppleUseCaseResponse>>
}
