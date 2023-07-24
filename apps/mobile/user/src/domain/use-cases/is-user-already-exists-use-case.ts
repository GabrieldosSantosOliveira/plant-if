import { Either } from '@/shared/either'

import { Exception } from './errors/exception'
export type UserUiModelProvider = 'email' | 'facebook' | 'google'

export interface IsUserAlreadyExistsUseCaseResponse {
  userExists: boolean
  provider?: UserUiModelProvider
}
export interface IsUserAlreadyExistsUseCase {
  execute(
    email: string,
  ): Promise<Either<Exception, IsUserAlreadyExistsUseCaseResponse>>
}
