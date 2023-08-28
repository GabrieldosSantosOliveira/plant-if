import { keys } from '@/constants/keys'
import { SecureStorage } from '@/data/protocols/storage/secure-storage'
import { AuthWithFacebookRepository } from '@/domain/repositories/auth-with-facebook-repository'
import { UserUiModel } from '@/domain/ui-model/user-ui-model'
import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case'
import { Exception } from '@/domain/use-cases/errors/exception'
import { Either, left, right } from '@/shared/either'

export class AuthWithFacebookUseCaseImpl implements AuthWithFacebookUseCase {
  constructor(
    private readonly authWithFacebookRepository: AuthWithFacebookRepository,
    private readonly secureStorage: SecureStorage,
  ) {}

  async execute(accessToken: string): Promise<Either<Exception, UserUiModel>> {
    const userOrException =
      await this.authWithFacebookRepository.execute(accessToken)

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
