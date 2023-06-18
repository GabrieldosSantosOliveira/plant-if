import { User } from '@/app/entities/user'
import { LoadGoogleUser } from '@/app/repositories/google/load-google-user'
import { CreateUserRepository } from '@/app/repositories/user/create-user-repository'
import { LoadUserByEmailRepository } from '@/app/repositories/user/load-user-by-email-repository'
import { AuthService } from '@/interfaces/auth/auth-service'
import {
  CreateUserWithGoogleUseCase,
  CreateUserWithGoogleUseCaseRequest,
  CreateUserWithGoogleUseCaseResponse,
} from '@/interfaces/use-cases/user/create-user-with-google-use-case'

export class CreateUserWithGoogleUseCaseImpl
  implements CreateUserWithGoogleUseCase
{
  constructor(
    private readonly loadGoogleUser: LoadGoogleUser,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly authService: AuthService,
    private readonly createUserRepository: CreateUserRepository,
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
    })
    await this.createUserRepository.create(user)
    const { accessToken, refreshToken } =
      await this.authService.generateAccessTokenAndRefreshToken(user.id)
    return { accessToken, refreshToken, user }
  }
}
