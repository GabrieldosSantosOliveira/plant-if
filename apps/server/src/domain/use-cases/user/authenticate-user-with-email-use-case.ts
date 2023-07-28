import { User } from '@/domain/entities/user'
import { Either } from '@/shared/either'

import { Exception } from '../errors/exception'
export interface AuthenticateUserWithEmailUseCaseRequest {
  email: string
  password: string
}
export interface AuthenticateUserWithEmailUseCaseResponse {
  accessToken: string
  refreshToken: string
  user: User
}
export interface AuthenticateUserWithEmailUseCase {
  handle(
    credentials: AuthenticateUserWithEmailUseCaseRequest,
  ): Promise<Either<Exception, AuthenticateUserWithEmailUseCaseResponse>>
}
