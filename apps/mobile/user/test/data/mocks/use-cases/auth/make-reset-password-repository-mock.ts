import { ResetPasswordRepository } from '@/domain/repositories/reset-password-repository'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { Either, left, right } from '@/shared/either'

export class ResetPasswordRepositoryMock implements ResetPasswordRepository {
  async execute(): Promise<Either<Exception, null>> {
    return right(null)
  }
}
export const makeResetPasswordRepositoryMock = () => {
  const resetPasswordRepositoryMock = new ResetPasswordRepositoryMock()
  return { resetPasswordRepositoryMock }
}
export class ResetPasswordRepositoryMockWithError
  implements ResetPasswordRepository
{
  async execute(): Promise<Either<Exception, null>> {
    throw new Error()
  }
}
export const makeResetPasswordRepositoryMockWithError = () => {
  const resetPasswordRepositoryMockWithError =
    new ResetPasswordRepositoryMockWithError()
  return { resetPasswordRepositoryMockWithError }
}
export class ResetPasswordRepositoryMockWithException
  implements ResetPasswordRepository
{
  async execute(): Promise<Either<Exception, null>> {
    return left(new UnexpectedException())
  }
}
export const makeResetPasswordRepositoryMockWithException = () => {
  const resetPasswordRepositoryMockWithException =
    new ResetPasswordRepositoryMockWithException()
  return { resetPasswordRepositoryMockWithException }
}
