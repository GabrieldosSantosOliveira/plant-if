import { AuthService } from '@/data/protocols/auth/auth-service'
import { LoadFacebookUser } from '@/domain/contracts/gateways/facebook/load-facebook-user'
import { GeneratorUUID } from '@/domain/contracts/gateways/uuid/generator-uuid'
import { CreateUserRepository } from '@/domain/contracts/repositories/user/create-user-repository'
import { LoadUserByEmailRepository } from '@/domain/contracts/repositories/user/load-user-by-email-repository'
import { User } from '@/domain/entities/user'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import {
  CreateUserWithFacebookUseCase,
  CreateUserWithFacebookUseCaseRequest,
  CreateUserWithFacebookUseCaseResponse,
} from '@/domain/use-cases/user/create-user-with-facebook-use-case'
import { Either, Right, left, right } from '@/shared/either'

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
  ): Promise<Either<Exception, CreateUserWithFacebookUseCaseResponse>> {
    const facebookUser = await this.loadFacebookUser.loadUser({
      accessToken: request.accessToken,
    })
    if (!facebookUser.success || !facebookUser.user) {
      return left(new UnauthorizedException())
    }
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      facebookUser.user.email,
    )
    if (userExists) {
      const { accessToken } = await this.authService.generateAccessToken(
        userExists.id,
      )
      const { refreshToken } = await this.authService.generateRefreshToken(
        userExists.id,
      )
      return right({ accessToken, refreshToken, user: userExists })
    }
    const user = new User({
      email: facebookUser.user.email,
      firstName: facebookUser.user.firstName,
      lastName: facebookUser.user.lastName,
      image: facebookUser.user.picture,
      id: this.generatorUUID.randomUUID(),
      provider: 'facebook',
    })
    await this.createUserRepository.create(user)
    const { refreshToken } = await this.authService.generateRefreshToken(
      user.id,
    )
    const { accessToken } = await this.authService.generateAccessToken(user.id)
    return new Right({ accessToken, refreshToken, user })
  }
}
