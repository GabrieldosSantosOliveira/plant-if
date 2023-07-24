import { Exception } from '@/domain/use-cases/errors/exception'
import {
  IsUserAlreadyExistsUseCase,
  IsUserAlreadyExistsUseCaseResponse,
} from '@/domain/use-cases/is-user-already-exists-use-case'
import { Either, right } from '@/shared/either'

export class IsUserAlreadyExistsUseCaseMock
  implements IsUserAlreadyExistsUseCase
{
  async execute(): Promise<
    Either<Exception, IsUserAlreadyExistsUseCaseResponse>
  > {
    return right<Exception, IsUserAlreadyExistsUseCaseResponse>({
      userExists: true,
      provider: 'email',
    })
  }
}
export const makeIsUserAlreadyExistsUseCaseResponse = () => {
  const isUserAlreadyExistsUseCaseMock = new IsUserAlreadyExistsUseCaseMock()
  return { isUserAlreadyExistsUseCaseMock }
}
