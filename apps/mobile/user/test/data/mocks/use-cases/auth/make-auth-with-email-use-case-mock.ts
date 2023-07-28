import { UserUiModel } from '@/domain/ui-model/user-ui-model'
import { AuthWithEmailUseCase } from '@/domain/use-cases/auth-with-email-use-case'
import { Exception } from '@/domain/use-cases/errors/exception'
import { Either, right } from '@/shared/either'
import { makeUserUiModel } from '@/test/domain/factories/make-user-ui-model'

export class AuthWithEmailUseCaseMock implements AuthWithEmailUseCase {
  async execute(): Promise<Either<Exception, UserUiModel>> {
    return right(makeUserUiModel())
  }
}
export const makeAuthWithEmailUseCaseMock = () => {
  const authWithEmailUseCaseMock = new AuthWithEmailUseCaseMock()
  return { authWithEmailUseCaseMock }
}
