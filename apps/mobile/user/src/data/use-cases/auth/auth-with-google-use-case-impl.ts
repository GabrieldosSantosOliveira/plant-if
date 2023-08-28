import { keys } from '@/constants/keys'
import { SecureStorage } from '@/data/protocols/storage/secure-storage'
import { AuthWithGoogleRepository } from '@/domain/repositories/auth-with-google-repository'
import { UserUiModel } from '@/domain/ui-model/user-ui-model'
import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case'
import { Exception } from '@/domain/use-cases/errors/exception'
import { Either, left, right } from '@/shared/either'

export class AuthWithGoogleUseCaseImpl implements AuthWithGoogleUseCase {
  constructor(
    private readonly secureStorage: SecureStorage,
    private readonly authWithGoogleRepository: AuthWithGoogleRepository,
  ) {}

  async execute(accessToken: string): Promise<Either<Exception, UserUiModel>> {
    const userOrException =
      await this.authWithGoogleRepository.execute(accessToken)
    if (userOrException.isLeft()) {
      return left(userOrException.value)
    }
    await Promise.all([
      this.secureStorage.setItem(
        keys.ACCESS_TOKEN,
        userOrException.value.accessToken,
      ),
      this.secureStorage.setItem(
        keys.REFRESH_TOKEN,
        userOrException.value.refreshToken,
      ),
    ])
    return right(userOrException.value.user)
  }
}
