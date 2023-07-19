import { LoadGoogleUser } from '@/domain/contracts/gateways/google/load-google-user'
import { GeneratorUUID } from '@/domain/contracts/gateways/uui/generator-uuid'
import { CreateUserRepository } from '@/domain/contracts/repositories/user/create-user-repository'
import { LoadUserByEmailRepository } from '@/domain/contracts/repositories/user/load-user-by-email-repository'
import { User } from '@/domain/entities/user'
import {
  CreateUserWithGoogleUseCase,
  CreateUserWithGoogleUseCaseRequest,
  CreateUserWithGoogleUseCaseResponse,
} from '@/domain/use-cases/user/create-user-with-google-use-case'
import { AuthService } from '@/interfaces/auth/auth-service'

export class CreateUserWithGoogleUseCaseImpl
  implements CreateUserWithGoogleUseCase
{
  constructor(
    private readonly loadGoogleUser: LoadGoogleUser,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly authService: AuthService,
    private readonly createUserRepository: CreateUserRepository,
    private readonly generatorUUID: GeneratorUUID,
  ) {}

  async handle(
    request: CreateUserWithGoogleUseCaseRequest,
  ): Promise<CreateUserWithGoogleUseCaseResponse> {
    const googleUser = await this.loadGoogleUser.loadUser({
      accessToken: request.accessToken,
    })
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      googleUser.email,
    )
    if (userExists) {
      const { accessToken, refreshToken } =
        await this.authService.generateAccessTokenAndRefreshToken(userExists.id)
      return { accessToken, refreshToken, user: userExists }
    }
    const user = new User({
      email: googleUser.email,
      firstName: googleUser.given_name,
      lastName: googleUser.family_name,
      image: googleUser.picture,
      id: this.generatorUUID.randomUUID(),
    })
    await this.createUserRepository.create(user)
    const { accessToken, refreshToken } =
      await this.authService.generateAccessTokenAndRefreshToken(user.id)
    return { accessToken, refreshToken, user }
  }
}
