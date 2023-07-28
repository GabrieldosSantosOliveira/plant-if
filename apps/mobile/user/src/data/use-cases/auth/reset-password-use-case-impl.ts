import { ResetPasswordRepository } from '@/domain/repositories/reset-password-repository'
import { Exception } from '@/domain/use-cases/errors/exception'
import {
  ResetPasswordUseCase,
  ResetPasswordUseCaseDto,
} from '@/domain/use-cases/reset-password-use-case'
import { Either, left } from '@/shared/either'

export class ResetPasswordUseCaseImpl implements ResetPasswordUseCase {
  constructor(
    private readonly resetPasswordRepository: ResetPasswordRepository,
  ) {}

  async execute(
    data: ResetPasswordUseCaseDto,
  ): Promise<Either<Exception, null>> {
    const successOrFails = await this.resetPasswordRepository.execute(data)
    if (successOrFails.isLeft()) {
      return left(successOrFails.value)
    }
    return successOrFails
  }
}
