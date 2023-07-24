import { UserUiModel } from '@/domain/ui-model/user-ui-model'
import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case'
import { Exception } from '@/domain/use-cases/errors/exception'
import { Either, right } from '@/shared/either'
import { makeUserUiModel } from '@/test/domain/factories/make-user-ui-model'

export class AuthWithGoogleUseCaseMock implements AuthWithGoogleUseCase {
  async execute(): Promise<Either<Exception, UserUiModel>> {
    return right(makeUserUiModel())
  }
}
export const makeAuthWithGoogleUseCaseMock = () => {
  const authWithGoogleUseCaseMock = new AuthWithGoogleUseCaseMock()
  return { authWithGoogleUseCaseMock }
}
