import { Exception } from '@/domain/use-cases/errors/exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import { ResetPasswordUseCase } from '@/domain/use-cases/user/reset-password-use-case'
import { Either, left, right } from '@/shared/either'

export class ResetPasswordUseCaseMock implements ResetPasswordUseCase {
  async handle(): Promise<Either<Exception, null>> {
    return right(null)
  }
}
export const makeResetPasswordUseCaseMock = () => {
  const resetPasswordUseCaseMock = new ResetPasswordUseCaseMock()
  return { resetPasswordUseCaseMock }
}
export class ResetPasswordUseCaseMockWithError implements ResetPasswordUseCase {
  async handle(): Promise<Either<Exception, null>> {
    throw new Error()
  }
}
export const makeResetPasswordUseCaseMockWithError = () => {
  const resetPasswordUseCaseMockWithError =
    new ResetPasswordUseCaseMockWithError()
  return { resetPasswordUseCaseMockWithError }
}
export class ResetPasswordUseCaseMockWithException
  implements ResetPasswordUseCase
{
  async handle(): Promise<Either<Exception, null>> {
    return left(new UserNotFoundException())
  }
}
export const makeResetPasswordUseCaseMockWithException = () => {
  const resetPasswordUseCaseMockWithException =
    new ResetPasswordUseCaseMockWithException()
  return { resetPasswordUseCaseMockWithException }
}
