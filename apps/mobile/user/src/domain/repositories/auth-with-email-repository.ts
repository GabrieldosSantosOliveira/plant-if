import { Either } from '@/shared/either'

import { UserUiModel } from '../ui-model/user-ui-model'
import { Exception } from '../use-cases/errors/exception'

export interface AuthWithEmailRepositoryDto {
  email: string
  password: string
}
export interface AuthWithEmailRepositoryResponse {
  user: UserUiModel
  accessToken: string
  refreshToken: string
}
export interface AuthWithEmailRepository {
  execute(
    credentials: AuthWithEmailRepositoryDto,
  ): Promise<Either<Exception, AuthWithEmailRepositoryResponse>>
}
