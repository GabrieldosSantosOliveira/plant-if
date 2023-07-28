import { Either } from '@/shared/either'

import { UserUiModel } from '../ui-model/user-ui-model'
import { Exception } from './errors/exception'
export interface AuthWithEmailUseCaseDto {
  email: string
  password: string
}
export interface AuthWithEmailUseCase {
  execute(
    data: AuthWithEmailUseCaseDto,
  ): Promise<Either<Exception, UserUiModel>>
}
