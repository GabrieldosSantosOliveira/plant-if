import { LoadUserByEmailRepository } from '@/domain/contracts/repositories/user/load-user-by-email-repository'
import {
  IsUserAlreadyExistsUseCase,
  IsUserAlreadyExistsUseCaseRequest,
  IsUserAlreadyExistsUseCaseResponse,
} from '@/domain/use-cases/user/is-user-already-exists-use-case'

export class IsUserAlreadyExistsUseCaseImpl
  implements IsUserAlreadyExistsUseCase
{
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
  ) {}

  async handle(
    request: IsUserAlreadyExistsUseCaseRequest,
  ): Promise<IsUserAlreadyExistsUseCaseResponse> {
    const isUserAlreadyExists =
      await this.loadUserByEmailRepository.findByEmail(request.email)
    if (isUserAlreadyExists) {
      return { userExists: true, provider: isUserAlreadyExists.provider }
    }
    return { userExists: false, provider: undefined }
  }
}
