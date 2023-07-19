import { LoadFacebookUser } from '@/domain/contracts/gateways/facebook/load-facebook-user'
import { GeneratorUUID } from '@/domain/contracts/gateways/uuid/generator-uuid'
import { CreateUserRepository } from '@/domain/contracts/repositories/user/create-user-repository'
import { LoadUserByEmailRepository } from '@/domain/contracts/repositories/user/load-user-by-email-repository'
import { User } from '@/domain/entities/user'
import {
  CreateUserWithFacebookUseCase,
  CreateUserWithFacebookUseCaseRequest,
  CreateUserWithFacebookUseCaseResponse,
} from '@/domain/use-cases/user/create-user-with-facebook-use-case'
import { AuthService } from '@/interfaces/auth/auth-service'

export class CreateUserWithFacebookUseCaseImpl
  implements CreateUserWithFacebookUseCase
{
  constructor(
    private readonly loadFacebookUser: LoadFacebookUser,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly authService: AuthService,
    private readonly createUserRepository: CreateUserRepository,
    private readonly generatorUUID: GeneratorUUID,
  ) {}

  async handle(
    request: CreateUserWithFacebookUseCaseRequest,
  ): Promise<CreateUserWithFacebookUseCaseResponse> {
    const facebookUser = await this.loadFacebookUser.loadUser({
      accessToken: request.accessToken,
    })
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      facebookUser.email,
    )
    if (userExists) {
      const { accessToken, refreshToken } =
        await this.authService.generateAccessTokenAndRefreshToken(userExists.id)
      return { accessToken, refreshToken, user: userExists }
    }
    const user = new User({
      email: facebookUser.email,
      firstName: facebookUser.firstName,
      lastName: facebookUser.lastName,
      image: facebookUser.picture,
      id: this.generatorUUID.randomUUID(),
    })
    await this.createUserRepository.create(user)
    const { accessToken, refreshToken } =
      await this.authService.generateAccessTokenAndRefreshToken(user.id)
    return { accessToken, refreshToken, user }
  }
}
