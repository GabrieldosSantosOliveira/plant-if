import { Exception } from '@/domain/use-cases/errors/exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import { ForgotPasswordUseCase } from '@/domain/use-cases/user/forgot-password-use-case'
import { Either, left, right } from '@/shared/either'

export class ForgotPasswordUseCaseMock implements ForgotPasswordUseCase {
  async handle(): Promise<Either<Exception, null>> {
    return right(null)
  }
}
export const makeForgotPasswordUseCaseMock = () => {
  const forgotPasswordUseCaseMock = new ForgotPasswordUseCaseMock()
  return { forgotPasswordUseCaseMock }
}
export class ForgotPasswordUseCaseMockWithError
  implements ForgotPasswordUseCase
{
  async handle(): Promise<Either<Exception, null>> {
    throw new Error()
  }
}
export const makeForgotPasswordUseCaseMockWithError = () => {
  const forgotPasswordUseCaseMockWithError =
    new ForgotPasswordUseCaseMockWithError()
  return { forgotPasswordUseCaseMockWithError }
}

export class ForgotPasswordUseCaseMockWithException
  implements ForgotPasswordUseCase
{
  async handle(): Promise<Either<Exception, null>> {
    return left(new UserNotFoundException())
  }
}
export const makeForgotPasswordUseCaseMockWithException = () => {
  const forgotPasswordUseCaseMockWithException =
    new ForgotPasswordUseCaseMockWithException()
  return { forgotPasswordUseCaseMockWithException }
}
