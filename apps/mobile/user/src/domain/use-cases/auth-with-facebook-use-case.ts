import { Either } from '@/shared/either'

import { UserUiModel } from '../ui-model/user-ui-model'
import { Exception } from './errors/exception'

export interface AuthWithFacebookUseCase {
  execute(accessToken: string): Promise<Either<Exception, UserUiModel>>
}
