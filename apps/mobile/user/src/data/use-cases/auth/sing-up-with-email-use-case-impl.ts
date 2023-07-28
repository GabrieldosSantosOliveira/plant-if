import { keys } from '@/constants/keys'
import { SecureStorage } from '@/data/protocols/storage/secure-storage'
import { SingUpWithEmailRepository } from '@/domain/repositories/sing-up-with-email-repository'
import { UserUiModel } from '@/domain/ui-model/user-ui-model'
import { Exception } from '@/domain/use-cases/errors/exception'
import {
  SingUpWithEmailUseCase,
  SingUpWithEmailUseCaseDto,
} from '@/domain/use-cases/sing-up-with-email-use-case'
import { Either, left, right } from '@/shared/either'

export class SingUpWithEmailUseCaseImpl implements SingUpWithEmailUseCase {
  constructor(
    private readonly singUpWithEmailRepository: SingUpWithEmailRepository,
    private readonly secureStorage: SecureStorage,
  ) {}

  async execute(
    data: SingUpWithEmailUseCaseDto,
  ): Promise<Either<Exception, UserUiModel>> {
    const userOrFails = await this.singUpWithEmailRepository.execute(data)
    if (userOrFails.isLeft()) {
      return left(userOrFails.value)
    }
    await Promise.all([
      this.secureStorage.setItem(
        keys.ACCESS_TOKEN,
        userOrFails.value.accessToken,
      ),
      this.secureStorage.setItem(
        keys.REFRESH_TOKEN,
        userOrFails.value.refreshToken,
      ),
    ])
    return right(userOrFails.value.user)
  }
}
