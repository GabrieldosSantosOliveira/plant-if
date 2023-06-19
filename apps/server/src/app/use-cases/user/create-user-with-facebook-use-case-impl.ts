import { User } from '@/app/entities/user'
import { LoadFacebookUser } from '@/app/repositories/facebook/load-facebook-user'
import { CreateUserRepository } from '@/app/repositories/user/create-user-repository'
import { LoadUserByEmailRepository } from '@/app/repositories/user/load-user-by-email-repository'
import { AuthService } from '@/interfaces/auth/auth-service'
import {
  CreateUserWithFacebookUseCase,
  CreateUserWithFacebookUseCaseRequest,
  CreateUserWithFacebookUseCaseResponse,
} from '@/interfaces/use-cases/user/create-user-with-facebook-use-case'

export class CreateUserWithFacebookUseCaseImpl
  implements CreateUserWithFacebookUseCase
{
  constructor(
    private readonly loadFacebookUser: LoadFacebookUser,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly authService: AuthService,
    private readonly createUserRepository: CreateUserRepository,
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
    })
    await this.createUserRepository.create(user)
    const { accessToken, refreshToken } =
      await this.authService.generateAccessTokenAndRefreshToken(user.id)
    return { accessToken, refreshToken, user }
  }
}
