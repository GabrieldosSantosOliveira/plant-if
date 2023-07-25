import { Either } from '@/shared/either'

import { Exception } from '../errors/exception'
export interface ForgotPasswordUseCaseRequest {
  email: string
}

export interface ForgotPasswordUseCase {
  handle(
    request: ForgotPasswordUseCaseRequest,
  ): Promise<Either<Exception, null>>
}
