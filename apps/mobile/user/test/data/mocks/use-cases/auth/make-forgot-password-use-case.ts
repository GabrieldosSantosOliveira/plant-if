import { Exception } from '@/domain/use-cases/errors/exception';
import { ForgotPasswordUseCase } from '@/domain/use-cases/forgot-password-use-case';
import { Either, right } from '@/shared/either';

export class ForgotPasswordUseCaseMock implements ForgotPasswordUseCase {
  async execute(): Promise<Either<Exception, null>> {
    return right(null);
  }
}
export const makeForgotPasswordUseCaseMock = () => {
  const forgotPasswordUseCaseMock = new ForgotPasswordUseCaseMock();
  return { forgotPasswordUseCaseMock };
};
