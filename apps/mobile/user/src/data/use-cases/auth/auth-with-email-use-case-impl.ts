import { keys } from '@/constants/keys'
import { SecureStorage } from '@/data/protocols/storage/secure-storage'
import { AuthWithEmailRepository } from '@/domain/repositories/auth-with-email-repository'
import { UserUiModel } from '@/domain/ui-model/user-ui-model'
import {
  AuthWithEmailUseCase,
  AuthWithEmailUseCaseDto,
} from '@/domain/use-cases/auth-with-email-use-case'
import { Exception } from '@/domain/use-cases/errors/exception'
import { Either, left, right } from '@/shared/either'

export class AuthUserWithEmailUseCaseImpl implements AuthWithEmailUseCase {
  constructor(
    private readonly authWithEmailRepository: AuthWithEmailRepository,
    private readonly secureStorage: SecureStorage,
  ) {}

  async execute(
    data: AuthWithEmailUseCaseDto,
  ): Promise<Either<Exception, UserUiModel>> {
    const successOrFails = await this.authWithEmailRepository.execute({
      email: data.email,
      password: data.password,
    })
    if (successOrFails.isLeft()) {
      return left(successOrFails.value)
    }
    await Promise.all([
      this.secureStorage.setItem(
        keys.ACCESS_TOKEN,
        successOrFails.value.accessToken,
      ),
      this.secureStorage.setItem(
        keys.REFRESH_TOKEN,
        successOrFails.value.refreshToken,
      ),
    ])

    return right(successOrFails.value.user)
  }
}
