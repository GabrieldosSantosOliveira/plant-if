import { ForgotPasswordRepository } from '@/domain/repositories/forgot-password-repository';
import { Exception } from '@/domain/use-cases/errors/exception';
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception';
import { Either, left, right } from '@/shared/either';

export class ForgotPasswordRepositoryMock implements ForgotPasswordRepository {
  async execute(): Promise<Either<Exception, null>> {
    return right(null);
  }
}
export const makeForgotPasswordRepositoryMock = () => {
  const forgotPasswordRepositoryMock = new ForgotPasswordRepositoryMock();
  return { forgotPasswordRepositoryMock };
};
export class ForgotPasswordRepositoryMockWithError
  implements ForgotPasswordRepository
{
  async execute(): Promise<Either<Exception, null>> {
    throw new Error();
  }
}
export const makeForgotPasswordRepositoryMockWithError = () => {
  const forgotPasswordRepositoryMockWithError =
    new ForgotPasswordRepositoryMockWithError();
  return { forgotPasswordRepositoryMockWithError };
};
export class ForgotPasswordRepositoryMockWithException
  implements ForgotPasswordRepository
{
  async execute(): Promise<Either<Exception, null>> {
    return left(new UnexpectedException());
  }
}
export const makeForgotPasswordRepositoryMockWithException = () => {
  const forgotPasswordRepositoryMockWithException =
    new ForgotPasswordRepositoryMockWithException();
  return { forgotPasswordRepositoryMockWithException };
};
