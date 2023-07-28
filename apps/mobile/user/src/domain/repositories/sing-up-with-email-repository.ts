import { Either } from '@/shared/either'

import { UserUiModel } from '../ui-model/user-ui-model'
import { Exception } from '../use-cases/errors/exception'

export interface SingUpWithEmailRepositoryDto {
  email: string
  password: string
  firstName: string
  lastName: string
}
export interface SingUpWithEmailRepositoryResponse {
  user: UserUiModel
  accessToken: string
  refreshToken: string
}
export interface SingUpWithEmailRepository {
  execute(
    data: SingUpWithEmailRepositoryDto,
  ): Promise<Either<Exception, SingUpWithEmailRepositoryResponse>>
}
