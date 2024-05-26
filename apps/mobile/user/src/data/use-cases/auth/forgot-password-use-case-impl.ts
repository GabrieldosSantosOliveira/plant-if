import { Exception } from '@/domain/use-cases/errors/exception';
import {
  ForgotPasswordUseCase,
  ForgotPasswordUseCaseDto,
} from '@/domain/use-cases/forgot-password-use-case';
import { Either, left } from '@/shared/either';

export class ForgotPasswordUseCaseImpl implements ForgotPasswordUseCase {
  constructor(private readonly forgotPasswordUseCase: ForgotPasswordUseCase) {}
  async execute(
    data: ForgotPasswordUseCaseDto,
  ): Promise<Either<Exception, null>> {
    const successOrFails = await this.forgotPasswordUseCase.execute(data);
    if (successOrFails.isLeft()) {
      return left(successOrFails.value);
    }
    return successOrFails;
  }
}
